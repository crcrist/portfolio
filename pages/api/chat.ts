import type { NextApiRequest, NextApiResponse } from "next";
import { VertexAI } from "@google-cloud/vertexai";

/**
 * Vertex AI Gemini chat endpoint
 * Uses gemini-2.5-flash for speed & cost efficiency
 */
const vertex = new VertexAI({
  project: process.env.GCP_PROJECT_ID,
  location: "us-central1",
});
const model = vertex.getGenerativeModel({ model: "gemini-2.5-flash" });

const systemPrompt = `
You are Connor's professional advocate chatbot.
Connor Crist is a Senior Data Analyst at Walmart with over 3 years of experience
in analytics, engineering, and automation. He builds intelligent tools and 
data-driven applications using Python, SQL, BigQuery, and React.
Answer questions confidently, clearly, and helpfully.
`;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  const { message } = req.body;

  try {
    const response = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: `${systemPrompt}\n\nUser: ${message}` }],
        },
      ],
    });

    const reply =
      response?.response?.candidates?.[0]?.content?.parts?.[0]?.text ??
      "No response received.";

    res.status(200).json({ reply });
  } catch (err: any) {
    console.error("Vertex AI error:", err);
    res.status(500).json({
      error: "Vertex AI request failed",
      details: err.message,
    });
  }
}
