import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

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
})
