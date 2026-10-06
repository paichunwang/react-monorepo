// eslint.config.js (Monorepo Root)
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';

export default tseslint.config(
  // 1. Globally ignore output folders and node_modules
  {
    ignores: ['**/dist/**', '**/node_modules/**', '**/.turbo/**'],
  },

  // 2. Base JS/TS Rules
  eslint.configs.recommended,
  ...tseslint.configs.recommended,

  // 3. Connect to tsconfig.json for type-aware linting
  {
    languageOptions: {
      parserOptions: {
        projectService: true, // Automatically resolves tsconfig.json across workspace submodules
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  // 4. React Rules
  {
    files: ['**/*.{jsx,tsx}'],
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
    },
    rules: {
      ...reactHooksPlugin.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off', // Not needed for React 17+
    },
  },

  // 5. CRITICAL: Prettier override (Must be LAST in array to disable conflicting ESLint rules)
  eslintConfigPrettier
);
