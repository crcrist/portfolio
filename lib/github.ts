/**
 * GitHub API Service
 * Fetches repository information from GitHub REST API
 */

export interface GitHubRepo {
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

export interface GitHubRepoStats {
  stars: number;
  forks: number;
  watchers: number;
  language: string | null;
  topics: string[];
  url: string;
}

/**
 * Fetch repository data from GitHub API
 * @param owner - GitHub username (e.g., "crcrist")
 * @param repo - Repository name (e.g., "customgpt-actions-test")
 * @param token - Optional GitHub Personal Access Token for higher rate limits
 */
export async function fetchGitHubRepo(
  owner: string,
  repo: string,
  token?: string
): Promise<GitHubRepo> {
  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
  };

  // Add token if provided
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}`,
    { headers }
  );

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Extract repository stats from GitHub API response
 */
export function extractRepoStats(repo: GitHubRepo): GitHubRepoStats {
  return {
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    watchers: repo.watchers_count,
    language: repo.language,
    topics: repo.topics,
    url: repo.html_url,
  };
}

/**
 * Parse GitHub URL or repo string into owner/repo format
 * @param input - GitHub URL or "owner/repo" string
 * @returns Object with owner and repo, or null if invalid
 */
export function parseGitHubRepo(input: string): { owner: string; repo: string } | null {
  // Handle full GitHub URLs
  const urlMatch = input.match(/github\.com\/([^\/]+)\/([^\/\?#]+)/);
  if (urlMatch) {
    return { owner: urlMatch[1], repo: urlMatch[2] };
  }

  // Handle "owner/repo" format
  const parts = input.split("/");
  if (parts.length === 2 && parts[0] && parts[1]) {
    return { owner: parts[0], repo: parts[1] };
  }

  return null;
}
