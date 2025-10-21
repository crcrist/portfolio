import type { NextApiRequest, NextApiResponse } from "next";
import { fetchGCSFile } from "../../lib/rag/fetchGCS";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const resume = await fetchGCSFile("resume.txt");
    const projects = await fetchGCSFile("projects.json");

    res.status(200).json({ resume, projects });
  } catch (err: any) {
    console.error("Error fetching context:", err);
    res.status(500).json({ error: "Failed to load context from GCS" });
  }
}
