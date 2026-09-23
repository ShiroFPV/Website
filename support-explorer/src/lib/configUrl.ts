/**
 * betaflight/config is grouped by manufacturer:
 *   configs/<MANUFACTURER>/<TARGET>/config.h
 * It used to be flat (configs/<TARGET>/config.h), and every link in this app
 * still pointed at the old shape — which 404s. Build them here instead.
 */
export function targetConfigUrl(target?: string | null, manufacturer?: string | null): string {
	if (!target) return "https://github.com/betaflight/config/tree/master/configs"
	if (!manufacturer) {
		// no manufacturer to hand — fall back to a code search that will find it
		const q = encodeURIComponent(`repo:betaflight/config path:configs/*/${target}/config.h`)
		return `https://github.com/search?q=${q}&type=code`
	}
	return `https://github.com/betaflight/config/blob/master/configs/${manufacturer}/${target}/config.h`
}
