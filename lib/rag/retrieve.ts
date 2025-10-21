// lib/rag/retrieve.ts
import fs from "fs/promises";
import path from "path";
import { GoogleAuth } from "google-auth-library";
import { cosSim } from "./embedText";

const PROJECT = process.env.GCP_PROJECT_ID!;
const LOCATION = "us-central1";
const MODEL = "text-embedding-005";

export type RetrievedChunk = {
  text: string;
  source: string;
  score: number;
};

/** Create an embedding for a single query string */
async function embedQuery(text: string): Promise<number[]> {
  const auth = new GoogleAuth({ scopes: "https://www.googleapis.com/auth/cloud-platform" });
  const token = await auth.getAccessToken();

  const url = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT}/locations/${LOCATION}/publishers/google/models/${MODEL}:predict`;
  const body = { instances: [{ content: text }] };

  const resp = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await resp.json();
  if (!resp.ok) throw new Error(JSON.stringify(data));
  return data.predictions[0].embeddings.values;
}

/** Search the local embedding index for top-k matches */
export async function retrieveRelevant(query: string, k = 4): Promise<RetrievedChunk[]> {
  const indexPath = path.join(process.cwd(), "data", "embeddings.json");
  const index = JSON.parse(await fs.readFile(indexPath, "utf8"));

  const queryVec = await embedQuery(query);

  const scored = index.map((item: any) => ({
    text: item.text,
    source: item.source,
    score: cosSim(queryVec, item.embedding),
  }));

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, k);
}
