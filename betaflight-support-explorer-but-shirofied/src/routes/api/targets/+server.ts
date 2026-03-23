import { env } from "$env/dynamic/private";
import { Octokit } from "octokit";
import { json } from "@sveltejs/kit";

export async function GET({ fetch }) {
    const octokit = new Octokit({
        auth: env.GITHUB_PAT,
        request: { fetch }
    });

    try {
        const { data: targets } = await octokit.request("GET /repos/{owner}/{repo}/contents/{path}", {
            owner: "betaflight",
            repo: "config",
            path: "configs"
        });

        let formattedTargets: string[] = [];

        if (Array.isArray(targets)) {
            formattedTargets = targets.map((target) => target.name);
        }

        return json(formattedTargets);
    } catch (error) {
        console.error("Error fetching targets:", error);
        return json([], { status: 500 });
    }
}