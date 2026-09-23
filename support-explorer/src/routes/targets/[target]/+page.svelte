<script lang="ts">
	import { page } from "$app/state"
	import { fly } from "svelte/transition"
	import CodeBlock from "$components/CodeBlock/CodeBlock.svelte"
	import { Icon } from "@steeze-ui/svelte-icon"
	import { Github, Copy, Check, Download, Search } from "@steeze-ui/lucide-icons"
	import TargetReleases from "$components/TargetReleases.svelte"
	import { targetConfigUrl } from "$lib/configUrl"
	// console.log(page.params.target)
	const targetName = page.params.target

	const { data } = $props()

	let target = $derived(data.config)
	let manufacturer = $derived(data.manufacturer)
	let cloudBuildTarget = $derived(data.cloudBuildTarget)

	const title = $derived(`${targetName} - Betaflight Support Explorer`)
	const description = $derived(`Target config for ${targetName} (${manufacturer.name})`)

	let copied = $state(false)
	let filter = $state("")

	// filter the config down to matching lines, keeping it readable
	let shownCode = $derived.by(() => {
		const code: string = target.content ?? ""
		const q = filter.trim().toLowerCase()
		if (!q) return code
		const hits = code.split("\n").filter((l) => l.toLowerCase().includes(q))
		return hits.length ? hits.join("\n") : "// no lines match \"" + filter + "\""
	})
	let matchCount = $derived(
		filter.trim()
			? (target.content ?? "").split("\n").filter((l) => l.toLowerCase().includes(filter.trim().toLowerCase())).length
			: 0
	)

	async function copyConfig() {
		try {
			await navigator.clipboard.writeText(target.content ?? "")
			copied = true
			setTimeout(() => (copied = false), 1600)
		} catch {
			/* clipboard blocked — nothing useful to do */
		}
	}

	function downloadConfig() {
		const blob = new Blob([target.content ?? ""], { type: "text/plain" })
		const url = URL.createObjectURL(blob)
		const a = document.createElement("a")
		a.href = url
		a.download = `${targetName}-config.h`
		a.click()
		URL.revokeObjectURL(url)
	}
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />

	<meta property="og:title" content={title} />
	<meta property="og:url" content="https://shirofpv.com/" />
	<meta property="og:type" content="website" />
	<meta property="og:description" content={description} />
	<meta name="theme-color" content="#b48bff" />
</svelte:head>

<div
	class="flex flex-col h-full max-w-screen md:p-16 md:pt-8 lg:p-4 p-2 pb-6 2xl:px-40 gap-6 relative"
	in:fly={{ x: 500, duration: 400 }}
>
	<div class="flex items-center justify-between gap-4 mt-10">
		<div class="flex flex-col gap-2">
			<div class="flex items-center gap-4">
				<header class="text-primary-500 h3 font-bold">{targetName}</header>
				{#if cloudBuildTarget.group === "supported"}
					<span class="badge preset-filled-success-500 font-semibold">Officially Supported</span>
				{/if}
			</div>
			{#if manufacturer.url}
				<a
					href={manufacturer.url}
					target="_blank"
					rel="noopener noreferrer"
					class="fancy-link w-fit text-surface-300 -ml-1">{manufacturer.name}</a
				>
			{:else}
				<span class="w-fit text-surface-300 -ml-1">{manufacturer.name}</span>
			{/if}
		</div>
		<div class="flex flex-wrap gap-2 items-center">
			<button class="btn preset-tonal-secondary" onclick={copyConfig} title="Copy config.h">
				<Icon src={copied ? Check : Copy} size="1.15rem" />
				<span>{copied ? "Copied" : "Copy"}</span>
			</button>
			<button class="btn preset-tonal-secondary" onclick={downloadConfig} title="Download config.h">
				<Icon src={Download} size="1.15rem" />
				<span>Download</span>
			</button>
			<a
				href={target.url ?? targetConfigUrl(targetName, manufacturer?.id)}
				target="_blank"
				rel="noopener noreferrer"
				class="btn preset-filled-primary-500"
			>
				Open in GitHub
				<Icon src={Github} size="1.15rem" />
			</a>
		</div>
	</div>
	<TargetReleases releases={cloudBuildTarget.releases} />
	<label class="cfg-filter">
		<Icon src={Search} size="1rem" />
		<input type="search" placeholder="Filter config lines (e.g. UART, MOTOR, GYRO)…" bind:value={filter} />
		{#if filter.trim()}
			<span class="cfg-count">{matchCount} line{matchCount === 1 ? "" : "s"}</span>
		{/if}
	</label>
	<CodeBlock
		code={shownCode}
		lang="c"
		classes="glass-card rounded-[4px] overflow-scroll"
		preClasses="[&>pre]:!bg-transparent"
	/>
</div>

<style>
	.cfg-filter {
		display: flex;
		align-items: center;
		gap: 0.55rem;
		margin: 1rem 0 0.6rem;
		padding: 0.5rem 0.7rem;
		border: 1px solid rgba(168, 142, 255, 0.11);
		border-radius: 3px;
		background: rgba(255, 255, 255, 0.02);
		color: #6f6790;
	}
	.cfg-filter:focus-within {
		border-color: rgba(255, 143, 199, 0.38);
	}
	.cfg-filter input {
		flex: 1;
		background: transparent;
		border: 0;
		outline: none;
		color: #f3efff;
		font-family: "JetBrains Mono", ui-monospace, monospace;
		font-size: 0.8rem;
	}
	.cfg-count {
		font-family: "JetBrains Mono", ui-monospace, monospace;
		font-size: 0.65rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: #ff8fc7;
		white-space: nowrap;
	}
</style>
