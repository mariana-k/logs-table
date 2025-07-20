// eslint.config.js
import js from '@eslint/js'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsparser from '@typescript-eslint/parser'
import react from 'eslint-plugin-react'

export default [
  js.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    ignores: ['vite.config.ts'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        project: './tsconfig.json',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
      globals: {
        document: 'readonly',
        window: 'readonly',
        console: 'readonly',
        module: 'writable',
        require: 'writable',
        URL: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      react,
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
    },
  },
  {
    files: ['*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: { module: 'writable', require: 'writable' },
    },
    rules: {},
  },
]
