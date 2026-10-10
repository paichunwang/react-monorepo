import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintReact from '@eslint-react/eslint-plugin';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    ignores: ['**/dist/**', '**/node_modules/**', '**/.turbo/**', '**/coverage/**'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  eslintReact.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ['**/*.config.js', '**/*.config.ts', '**/*.config.mjs', '**/*.config.cjs'],
    languageOptions: {
      parserOptions: {
        projectService: false,
      },
    },
  },
  eslintConfigPrettier,
]);
