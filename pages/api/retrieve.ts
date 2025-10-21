// pages/api/retrieve.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { retrieveRelevant } from "../../lib/rag/retrieve";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Use POST" });

  const { query, k } = req.body;
  if (!query) return res.status(400).json({ error: "Missing query" });

  try {
    const results = await retrieveRelevant(query, k ?? 4);
    res.status(200).json({ results });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
