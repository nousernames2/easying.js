import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, build } from 'vite'
import dts from 'vite-plugin-dts'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  root: '.',
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'Easying.js',
      fileName: 'index',
    },
    rollupOptions: {},
  },
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
    {
      name: 'demo-build',
      closeBundle() {
        build({
          root: 'demo-src',
          base: "./",
          build: {
            outDir: '../',
          },
        })
      },
    },
  ],
})
