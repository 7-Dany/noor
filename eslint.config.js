import js from '@eslint/js'
import { plugin as shadcnLint } from '@shadcn/lint'
import shadcnStructure from 'eslint-plugin-shadcn'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', 'build', '.react-router']),
  shadcnStructure.configs['base-recommended'],
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
    plugins: { 'shadcn-design': shadcnLint },
    rules: {
      'react-refresh/only-export-components': 'off',
      'shadcn-design/no-arbitrary-values': 'error',
      'shadcn-design/no-inline-styles': 'error',
      'shadcn-design/no-raw-colors': 'error',
      'shadcn-design/no-unknown-classes': 'error',
      'shadcn-design/no-restyle': ['error', { allow: ['layout'] }],
      'shadcn-design/require-static-classes': 'error',
    },
  },
  {
    // Generated components own their appearance; design rules apply to app code.
    files: ['src/components/ui/**/*.{ts,tsx}'],
    rules: {
      'shadcn-design/no-arbitrary-values': 'off',
      'shadcn-design/no-inline-styles': 'off',
      'shadcn-design/no-raw-colors': 'off',
      'shadcn-design/no-unknown-classes': 'off',
      'shadcn-design/no-restyle': 'off',
      'shadcn-design/require-static-classes': 'off',
    },
  },
])
