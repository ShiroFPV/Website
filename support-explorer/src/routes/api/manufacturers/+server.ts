import { env } from "$env/dynamic/private";
import { Octokit } from "octokit";
import { json } from "@sveltejs/kit";
import type { CBManufacturer } from "$lib/cloudBuildTypes";

export async function GET({ fetch }) {
    const octokit = new Octokit({
        auth: env.GITHUB_PAT,
        request: { fetch }
    });

    try {
        const { data: manufacturers } = await octokit.request(
            "GET /repos/{owner}/{repo}/contents/{path}",
            {
                owner: "betaflight",
                repo: "config",
                path: "Manufacturers.md"
            }
        );

        let formattedManufacturers: CBManufacturer[] = [];

        if (Array.isArray(manufacturers)) {
            console.log("Received array of files/directories");
        } else if ("content" in manufacturers) {
            const table = atob(manufacturers.content ?? "")
                .split("\n")
                .slice(7)
                .filter((line) => line.trim().length > 0);
            formattedManufacturers = table.map((line) => {
                const [id, name, contact] = line.split("|").slice(1, -1);
                return { id: id.trim(), name: name.trim(), contact: contact.trim() };
            });
        }

        return json(formattedManufacturers);
    } catch (error) {
        console.error("Error fetching manufacturers:", error);
        return json([], { status: 500 });
    }
}