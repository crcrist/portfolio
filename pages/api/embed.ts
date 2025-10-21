import type { NextApiRequest, NextApiResponse } from "next";
import { fetchGCSFile } from "../../lib/rag/fetchGCS";
import { chunkText, embedTexts } from "../../lib/rag/embedText";
import { loadStore, saveStore, VecItem } from "../../lib/rag/vectorStore";

/**
 * Builds/refreshes a local vector index from GCS files.
 * Dev-only API. Do not expose publicly without auth.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Use POST" });

  try {
    // 1) Load context from GCS
    const resume = String(await fetchGCSFile("resume.txt"));
    const projects = await fetchGCSFile("projects.json") as Array<{title: string; description: string}>;

    // 2) Create chunks
    const resumeChunks = chunkText(resume).map((text, i) => ({ source: `resume.txt#${i}`, text }));
    const projectChunks = projects.map((p, i) => ({
      source: `projects.json#${i}`,
      text: `${p.title}\n\n${p.description}`
    }));

    const allChunks = [...resumeChunks, ...projectChunks];

    // 3) Embed
    const embeddings = await embedTexts(allChunks.map(c => c.text));

    // 4) Persist
    const items: VecItem[] = embeddings.map((e, i) => ({
      id: `${allChunks[i].source}`,
      source: allChunks[i].source,
      text: allChunks[i].text,
      embedding: e,
    }));

    // Optionally merge with existing (here we replace)
    saveStore(items);

    res.status(200).json({
      status: "ok",
      chunks: items.length,
      sources: {
        resume: resumeChunks.length,
        projects: projectChunks.length,
      },
    });
  } catch (err: any) {
    console.error("Embedding build failed:", err);
    res.status(500).json({ error: "Embedding build failed", details: err.message });
  }
}
