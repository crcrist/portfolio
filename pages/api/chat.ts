// pages/api/chat.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { GoogleAuth } from "google-auth-library";
import { retrieveRelevant } from "../../lib/rag/retrieve";

const PROJECT = process.env.GCP_PROJECT_ID!;
const LOCATION = "us-central1";
const MODEL = "gemini-2.5-flash"; // Fast, cost-effective, great for chat

/** Generate a grounded chat response from Gemini using retrieved context */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Use POST" });

  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "Missing message" });

  try {
    // Step 1. Retrieve top-k relevant chunks
    const results = await retrieveRelevant(message, 4);
    const context = results.map(r => `• ${r.text}`).join("\n\n");

    // Step 2. Construct system + user prompt
    const systemPrompt = `
You are Connor Crist’s professional advocate. 
Answer user questions using the following context about his projects, skills, and experience. 
If the answer isn't explicitly found here, say "I'm not sure, but based on Connor's general experience..." and infer carefully.

Context:
${context}
`;

    // Step 3. Get access token for Vertex
    const auth = new GoogleAuth({
      scopes: "https://www.googleapis.com/auth/cloud-platform",
    });
    const token = await auth.getAccessToken();

    // Step 4. Send to Gemini via Vertex REST API
    const url = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT}/locations/${LOCATION}/publishers/google/models/${MODEL}:generateContent`;

    const body = {
      contents: [
        { role: "user", parts: [{ text: `${systemPrompt}\n\nUser: ${message}` }] },
      ],
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini API error:", data);
      throw new Error(data.error?.message || "Failed to generate response");
    }

    // Step 5. Extract and return the model output
    const output = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
    res.status(200).json({ output });
  } catch (err: any) {
    console.error("Chat error:", err);
    res.status(500).json({ error: err.message });
  }
}
