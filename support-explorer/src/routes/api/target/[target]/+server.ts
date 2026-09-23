import { env } from "$env/dynamic/private";
import { Octokit } from "octokit";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

/**
 * betaflight/config used to be flat (configs/<TARGET>/config.h).
 * It is now grouped by manufacturer (configs/<MANUFACTURER>/<TARGET>/config.h),
 * so a target name alone no longer gives us the path. We pull the repo tree
 * once and keep it in module memory to map target -> full path.
 */
type TreeEntry = { path: string; type: string };

let treeCache: { at: number; paths: Map<string, string> } | null = null;
const TREE_TTL_MS = 30 * 60 * 1000; // 30 min

async function getConfigPaths(octokit: Octokit): Promise<Map<string, string>> {
    if (treeCache && Date.now() - treeCache.at < TREE_TTL_MS) return treeCache.paths;

    const { data } = await octokit.request("GET /repos/{owner}/{repo}/git/trees/{tree_sha}", {
        owner: "betaflight",
        repo: "config",
        tree_sha: "master",
        recursive: "1"
    });

    const paths = new Map<string, string>();
    for (const entry of (data.tree ?? []) as TreeEntry[]) {
        // configs/<MANUFACTURER>/<TARGET>/config.h
        const m = entry.path?.match(/^configs\/[^/]+\/([^/]+)\/config\.h$/);
        if (m) paths.set(m[1].toUpperCase(), entry.path);
    }

    treeCache = { at: Date.now(), paths };
    return paths;
}

export const GET: RequestHandler = async ({ params, fetch }) => {
    const { target } = params;

    if (!target) {
        return json({ error: "Target parameter is required" }, { status: 400 });
    }

    const octokit = new Octokit({
        auth: env.GITHUB_PAT,
        request: { fetch }
    });

    try {
        const paths = await getConfigPaths(octokit);
        const path = paths.get(target.toUpperCase());

        if (!path) {
            // Plenty of cloud-build targets have no config.h upstream — that is
            // a normal outcome, not a failure, so say so precisely.
            return json(
                {
                    error: `No config.h published for "${target}" in betaflight/config`,
                    reason: "not_in_config_repo"
                },
                { status: 404 }
            );
        }

        const { data: configFile } = await octokit.request(
            "GET /repos/{owner}/{repo}/contents/{path}",
            { owner: "betaflight", repo: "config", path }
        );

        if (Array.isArray(configFile) || !("content" in configFile)) {
            return json({ error: "Unexpected response for config file" }, { status: 500 });
        }

        const content = atob(configFile.content.replace(/\n/g, ""));

        return json({
            target,
            path,
            content,
            url: configFile.html_url,
            sha: configFile.sha
        });
    } catch (error: unknown) {
        const status = (error as { status?: number })?.status;
        if (status === 403 || status === 429) {
            return json(
                {
                    error: "GitHub API rate limit reached. Set GITHUB_PAT to raise the limit.",
                    reason: "rate_limited"
                },
                { status: 503 }
            );
        }
        console.error("Error fetching target config:", error);
        return json({ error: "Failed to fetch target config" }, { status: 500 });
    }
};
