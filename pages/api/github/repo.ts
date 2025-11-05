import type { NextApiRequest, NextApiResponse } from "next";
import { fetchGitHubRepo, extractRepoStats, parseGitHubRepo } from "../../../lib/github";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { repo: repoParam } = req.query;

  if (!repoParam || typeof repoParam !== "string") {
    return res.status(400).json({ error: "Repository parameter is required" });
  }

  try {
    // Parse the repo parameter
    const parsed = parseGitHubRepo(repoParam);
    if (!parsed) {
      return res.status(400).json({
        error: "Invalid repository format. Use 'owner/repo' or GitHub URL"
      });
    }

    const { owner, repo } = parsed;

    // Get GitHub token from environment (optional)
    const token = process.env.GITHUB_TOKEN;

    // Fetch repo data from GitHub
    const repoData = await fetchGitHubRepo(owner, repo, token);
    const stats = extractRepoStats(repoData);

    // Cache for 5 minutes
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=300, stale-while-revalidate=600"
    );

    return res.status(200).json(stats);
  } catch (error) {
    console.error("GitHub API error:", error);

    if (error instanceof Error) {
      return res.status(500).json({
        error: "Failed to fetch repository data",
        message: error.message
      });
    }

    return res.status(500).json({ error: "Failed to fetch repository data" });
  }
}
