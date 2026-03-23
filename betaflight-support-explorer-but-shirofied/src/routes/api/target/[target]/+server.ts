import { env } from "$env/dynamic/private";
import { Octokit } from "octokit";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ params, fetch }) => {
    const { target } = params;

    const octokit = new Octokit({
        auth: env.GITHUB_PAT,
        request: { fetch }
    });

    if (!target) {
        return json({ error: "Target parameter is required" }, { status: 400 });
    }

    try {
        const { data: configFile } = await octokit.request(
            "GET /repos/{owner}/{repo}/contents/{path}",
            {
                owner: "betaflight",
                repo: "config",
                path: `configs/${target}/config.h`
            }
        );

        if (Array.isArray(configFile)) {
            return json({ error: "Expected file but received directory" }, { status: 500 });
        }

        if (!("content" in configFile)) {
            return json({ error: "No content available" }, { status: 404 });
        }

        const content = atob(configFile.content ?? "");

        return json({
            target,
            content,
            url: configFile.html_url,
            sha: configFile.sha,
            size: configFile.size
        });
    } catch (error: any) {
        console.error(`Error fetching config for target ${target}:`, error);
        if (error.status === 404) {
            return json({ error: `Target "${target}" not found` }, { status: 404 });
        }
        return json({ error: "Internal server error" }, { status: 500 });
    }
}