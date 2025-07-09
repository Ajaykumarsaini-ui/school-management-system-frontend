import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import importPlugin from 'eslint-plugin-import';

export default [
  {
    ignores: ['dist', 'node_modules'], // ignore build folders
  },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'import': importPlugin, // ✅ added for import rules
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,

      // ✅ General Code Quality
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      // ✅ Import Rules (🟦 Newly Added)
      'import/no-unresolved': 'error',             // 🟦 Detect missing files
      'import/no-duplicates': 'error',             // 🟦 Same file imported twice
      'import/no-cycle': 'warn',                   // 🟦 Detect circular dependencies
      'import/no-useless-path-segments': 'warn',   // 🟦 Detect "./../"
      'import/no-relative-parent-imports': 'off',  // Optional
      'import/no-case-sensitive-path': 'error',    // 🟦 Detect casing mismatch
    },
  },
];
