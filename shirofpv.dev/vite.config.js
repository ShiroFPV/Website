import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

function buildSecurityHeaders(includeDevWs) {
  const connectSources = [
    "'self'",
    ...(includeDevWs ? ['ws://localhost:5173', 'ws://127.0.0.1:5173'] : []),
    'blob:',
    'data:',
    'https://contact.shirofpv.com',
    'https://challenges.cloudflare.com',
    'https://ajax.googleapis.com',
    'https://www.gstatic.com',
  ].join(' ')

  return {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'SAMEORIGIN',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'microphone=(), geolocation=(), payment=(), usb=()',
    'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
    'Content-Security-Policy': [
      "default-src 'self'",
      "script-src 'self' https://ajax.googleapis.com https://challenges.cloudflare.com 'wasm-unsafe-eval' blob:",
      "worker-src 'self' blob:",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: blob: https:",
      `connect-src ${connectSources}`,
      'frame-src https://challenges.cloudflare.com',
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'self'",
    ].join('; '),
  }
}

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // Treat <model-viewer> (Google's web component) as a custom element
          // so Vue doesn't try to resolve it as a component.
          isCustomElement: (tag) => tag === 'model-viewer',
        },
      },
    }),
    tailwindcss(),
  ],
  build: {
    sourcemap: false,
  },
  server: {
    headers: buildSecurityHeaders(true),
  },
  preview: {
    headers: buildSecurityHeaders(false),
  },
})
