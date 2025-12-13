import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
  },
  esbuild: {
    tsconfig: 'tsconfig.vitest.json',
  },
});
