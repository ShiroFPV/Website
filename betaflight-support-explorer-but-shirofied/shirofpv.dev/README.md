# ShiroFPV.dev

Personal portfolio website for ShiroFPV — FPV Hardware Designer & Pilot.

Built with **Vue 3** + **Vite** + **Tailwind CSS**. Purple / pink / light blue aesthetic.

Live at **[shirofpv.dev](https://shirofpv.dev)** — deployed on [Netlify](https://www.netlify.com).

## Setup

```bash
npm install
npm run dev
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server at `http://localhost:5173` |
| `npm run build` | Build for production (output to `dist/`) |
| `npm run preview` | Preview the production build locally |

## Deployment

### Netlify (primary)
Push to GitHub and connect the repo. The `netlify.toml` configures the build command (`npm run build`) and publish directory (`dist/`) automatically.

### GitHub Pages
Build with `npm run build`, then deploy the `dist/` folder.

## Tech Stack

- **Vue 3** — Composition API with `<script setup>`
- **Vite** — Fast dev server and bundler
- **Vue Router** — Client-side routing with smooth transitions
- **Tailwind CSS** — Utility-first styling with custom color palette

## Color Palette

| Color | Hex |
|-------|-----|
| Background | `#0f0a1a` |
| Purple Primary | `#764ba2`, `#667eea` |
| Pink Accent | `#f472b6`, `#ec4899` |
| Light Blue | `#7dd3fc`, `#38bdf8` |

## License

This project is open source under the [MIT License](LICENSE).