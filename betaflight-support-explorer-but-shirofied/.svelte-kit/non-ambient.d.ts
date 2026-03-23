
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	type MatcherParam<M> = M extends (param : string) => param is (infer U extends string) ? U : string;

	export interface AppTypes {
		RouteId(): "/" | "/api" | "/api/manufacturers" | "/api/manufacturers/[manufacturer]" | "/api/targets" | "/api/target" | "/api/target/[target]" | "/settings" | "/targets" | "/targets/[target]" | "/[key]";
		RouteParams(): {
			"/api/manufacturers/[manufacturer]": { manufacturer: string };
			"/api/target/[target]": { target: string };
			"/targets/[target]": { target: string };
			"/[key]": { key: string }
		};
		LayoutParams(): {
			"/": { manufacturer?: string; target?: string; key?: string };
			"/api": { manufacturer?: string; target?: string };
			"/api/manufacturers": { manufacturer?: string };
			"/api/manufacturers/[manufacturer]": { manufacturer: string };
			"/api/targets": Record<string, never>;
			"/api/target": { target?: string };
			"/api/target/[target]": { target: string };
			"/settings": Record<string, never>;
			"/targets": { target?: string };
			"/targets/[target]": { target: string };
			"/[key]": { key: string }
		};
		Pathname(): "/" | "/api/manufacturers" | `/api/manufacturers/${string}` & {} | "/api/targets" | `/api/target/${string}` & {} | "/settings" | "/targets" | `/targets/${string}` & {} | `/${string}` & {};
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/favicon.svg" | string & {};
	}
}