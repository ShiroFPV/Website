/**
 * Detected problems -> the matching write-up on shirofpv.com/debugging.
 * The detector says what is wrong; the guide says how to fix it.
 */
const BASE = "https://shirofpv.com/debugging"

export interface Guide {
	slug: string
	label: string
}

const GUIDES: Record<string, Guide> = {
	"uart-no-signal": { slug: "uart-no-signal", label: "No signal from a UART device" },
	"receiver-not-detected": { slug: "receiver-not-detected", label: "Receiver not being detected" },
	"no-osd-digital": { slug: "no-osd-digital", label: "No OSD (Digital)" },
	"no-osd-analog": { slug: "no-osd-analog", label: "No OSD (Analog)" },
	"drone-jumping-flipping": { slug: "drone-jumping-flipping", label: "Jumping / flipping on arming" },
	"fc-high-cpu": { slug: "fc-high-cpu", label: "FC slow + CPU load extremely high" },
	"sticks-inverted": { slug: "sticks-inverted", label: "Sticks inverted / channel mapping" }
}

/** problem id -> guide key */
const PROBLEM_TO_GUIDE: Record<string, string> = {
	"high-cpu-load": "fc-high-cpu",
	"high-pid-rate": "fc-high-cpu",
	"high-dshot-rate": "fc-high-cpu",
	"dshot-without-bidir": "drone-jumping-flipping",
	"rx-protocol-not-matching": "receiver-not-detected",
	"rx-protocol-not-set": "receiver-not-detected",
	"multiple-serialrx-ports": "receiver-not-detected",
	"analog-osd-incompatibility": "no-osd-analog",
	"uncommon-channel-mapping": "sticks-inverted",
	"noncompliant-smartaudio-4-5-2": "uart-no-signal"
}

export function guideForProblem(problemId: string): (Guide & { url: string }) | null {
	const key = PROBLEM_TO_GUIDE[problemId]
	if (!key) return null
	const g = GUIDES[key]
	if (!g) return null
	return { ...g, url: `${BASE}#${g.slug}` }
}
