// lib/rag/embedText.ts
import { GoogleAuth } from "google-auth-library";

// --- Vertex AI Embedding Configuration ---
const PROJECT = process.env.GCP_PROJECT_ID!;
const LOCATION = "us-central1";
const MODEL = "text-embedding-005";

/**
 * Generate embeddings using Vertex AI REST API
 */
export async function embedTexts(texts: string[]): Promise<number[][]> {
  if (!texts.length) return [];

  const auth = new GoogleAuth({
    scopes: "https://www.googleapis.com/auth/cloud-platform",
  });
  const token = await auth.getAccessToken();

  const url = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT}/locations/${LOCATION}/publishers/google/models/${MODEL}:predict`;

  const body = { instances: texts.map(text => ({ content: text })) };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(JSON.stringify(data, null, 2));

  return data.predictions.map((p: any) => p.embeddings.values);
}

/**
 * Split long text into smaller, embeddable chunks
 */
export function chunkText(text: string, maxChars = 2800): string[] {
  const paras = text.split(/\n{2,}/g).map(p => p.trim()).filter(Boolean);
  const chunks: string[] = [];
  let cur = "";
  for (const p of paras) {
    if ((cur + "\n\n" + p).length > maxChars) {
      if (cur) chunks.push(cur);
      cur = p;
    } else {
      cur = cur ? cur + "\n\n" + p : p;
    }
  }
  if (cur) chunks.push(cur);
  return chunks;
}

/**
 * Compute cosine similarity between two vectors
 */
export function cosSim(a: number[], b: number[]): number {
  let dot = 0,
    na = 0,
    nb = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    na += a[i] * a[i];
    nb += b[i] * b[i];
  }
  return dot / (Math.sqrt(na) * Math.sqrt(nb) + 1e-8);
}
