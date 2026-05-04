import { fileURLToPath } from 'node:url';
import { defineConfig, configDefaults } from 'vitest/config';

export default defineConfig({
  test: {
    exclude: [...configDefaults.exclude, 'e2e/**'],
    projects: [
      {
        extends: './vitest.workspace.frontend.config.ts',
      },
      {
        extends: './vitest.workspace.backend.config.ts',
      },
    ],
  },
});