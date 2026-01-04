import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    environment: 'node',
    include: [
      'bin/**/*.{test,spec}.ts',
      'tests/unit/**/*.{test,spec}.{ts,js}',
      'tests/integration/**/*.{test,spec}.{ts,js}',
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'lcov'],
      reportsDirectory: './coverage',
      include: ['bin/**/*.ts'],
      exclude: [
        'bin/**/*.test.ts',
        'bin/**/*.spec.ts',
        'node_modules/**',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './bin'),
    },
  },
});
