import { defineConfig } from 'tsup'

export default defineConfig({
  entryPoints: ['src/index.ts', 'src/compression-worker.ts'],
  outDir: 'dist',
  format: ['esm'],
  target: 'node20',
  external: [/^[a-z]/i],
  noExternal: [/tinypool/],
})
