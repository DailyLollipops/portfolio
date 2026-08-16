#!/usr/bin/env node
// Fetches live GitHub stats (profile, contribution calendar, top languages)
// and regenerates src/assets/github-stats.ts.
//
// Auth: reads GH_PAT (or GITHUB_TOKEN). For full data (private repos +
// private contributions) use a classic Personal Access Token with the `repo`
// scope, e.g. GH_PAT="$(gh auth token)" npm run update:stats
//
// Runs on Node 18+ (global fetch required).

import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { execSync } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_FILE = path.resolve(__dirname, "../src/assets/github-stats.ts");
const TOP_LANGUAGES = 8;
// Repos the authenticated user owns plus repos in organizations they belong
// to (so contributions made under orgs are counted). Collaborator-only repos
// are excluded to avoid pulling in other users' unrelated projects.
const REPO_AFFILIATIONS = "owner,organization_member";

function resolveToken() {
  const envToken = process.env.GH_PAT || process.env.GITHUB_TOKEN;
  if (envToken) return envToken;
  try {
    return execSync("gh auth token", { encoding: "utf8" }).trim();
  } catch {
    return "";
  }
}

const token = resolveToken();
if (!token) {
  console.error(
    "No token found. Set GH_PAT (recommended) or GITHUB_TOKEN, or run via `gh auth login`."
  );
  process.exit(1);
}

const HEADERS = {
  Authorization: `Bearer ${token}`,
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  "User-Agent": "portfolio-stats-updater",
};

async function ghFetch(url, init = {}) {
  const res = await fetch(url, { ...init, headers: { ...HEADERS, ...init.headers } });
  if (res.status === 403 || res.status === 429) {
    console.error(`Rate limited while fetching ${url}. Try again later.`);
    process.exit(1);
  }
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`GitHub API ${res.status} for ${url}: ${body}`);
  }
  return res;
}

const VIEWER_QUERY = `query {
  viewer {
    login
    name
    avatarUrl
    followers { totalCount }
    contributionsCollection {
      totalCommitContributions
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            date
            contributionCount
          }
        }
      }
    }
  }
}`;

async function fetchViewer() {
  const res = await ghFetch("https://api.github.com/graphql", {
    method: "POST",
    body: JSON.stringify({ query: VIEWER_QUERY }),
  });
  const json = await res.json();
  if (json.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(json.errors)}`);
  }
  return json.data.viewer;
}

async function fetchRepos() {
  const repos = [];
  for (let page = 1; ; page++) {
    const url = `https://api.github.com/user/repos?per_page=100&page=${page}&affiliation=${REPO_AFFILIATIONS}&sort=updated`;
    const res = await ghFetch(url);
    const pageRepos = await res.json();
    if (!Array.isArray(pageRepos) || pageRepos.length === 0) break;
    for (const repo of pageRepos) {
      const owner = repo.owner?.login;
      if (!owner) continue;
      const languages = await fetchLanguages(owner, repo.name);
      repos.push({
        name: repo.name,
        owner,
        isPrivate: repo.private,
        stargazerCount: repo.stargazers_count ?? 0,
        fork: repo.fork,
        languages,
      });
    }
    if (pageRepos.length < 100) break;
  }
  return repos;
}

async function fetchLanguages(owner, repo) {
  const url = `https://api.github.com/repos/${owner}/${repo}/languages`;
  const res = await ghFetch(url);
  return res.json();
}

function aggregateLanguages(repos) {
  const bytesByLang = {};
  const projectsByLang = {};
  for (const repo of repos) {
    for (const [lang, bytes] of Object.entries(repo.languages)) {
      bytesByLang[lang] = (bytesByLang[lang] ?? 0) + bytes;
      const project = `${repo.owner}/${repo.name}`;
      const list = (projectsByLang[lang] ??= new Set());
      list.add(project);
    }
  }
  const total = Object.values(bytesByLang).reduce((a, b) => a + b, 0);
  const sorted = Object.entries(bytesByLang).sort((a, b) => b[1] - a[1]);
  return sorted.slice(0, TOP_LANGUAGES).map(([name, bytes]) => ({
    name,
    bytes,
    pct: Math.round((bytes / total) * 1000) / 10,
    projects: [...projectsByLang[name]],
  }));
}

function serialize(obj) {
  return JSON.stringify(obj, null, 2).replace(/\n      /g, "\n    ");
}

async function main() {
  const viewer = await fetchViewer();
  const login = viewer.login;
  const repos = await fetchRepos();

  const calendar = viewer.contributionsCollection.contributionCalendar.weeks
    .flatMap((w) => w.contributionDays)
    .map((d) => ({ date: d.date, count: d.contributionCount }));

  const languages = aggregateLanguages(repos);

  const stats = {
    name: viewer.name ?? login,
    login,
    avatarUrl: viewer.avatarUrl,
    followers: viewer.followers.totalCount,
    totalContributions: viewer.contributionsCollection.contributionCalendar.totalContributions,
    totalCommits: viewer.contributionsCollection.totalCommitContributions,
    repositories: repos.length,
    publicRepos: repos.filter((r) => !r.isPrivate).length,
    privateRepos: repos.filter((r) => r.isPrivate).length,
    totalStars: repos.reduce((sum, r) => sum + r.stargazerCount, 0),
    languages,
    calendar,
    updatedAt: new Date().toISOString(),
  };

  const file = `// Auto-generated from the GitHub API by scripts/update-github-stats.mjs
// Regenerate with: npm run update:stats
export interface GithubStats {
  name: string;
  login: string;
  avatarUrl: string;
  followers: number;
  totalContributions: number;
  totalCommits: number;
  repositories: number;
  publicRepos: number;
  privateRepos: number;
  totalStars: number;
  languages: { name: string; bytes: number; pct: number; projects: string[] }[];
  calendar: { date: string; count: number }[];
  updatedAt: string;
}

export const githubStats: GithubStats = ${serialize(stats)};
`;

  writeFileSync(OUT_FILE, file);
  console.log(
    `Wrote ${OUT_FILE}\n  followers=${stats.followers} repos=${stats.repositories} stars=${stats.totalStars}\n  contributions=${stats.totalContributions} commits=${stats.totalCommits} languages=${languages.length}`
  );
}

main().catch((err) => {
  console.error(err.message ?? err);
  process.exit(1);
});