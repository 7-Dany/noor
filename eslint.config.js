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
      'shadcn-design/no-arbitrary-values': [
        'error',
        {
          // The tone variant wires theme variables to component-scoped
          // custom properties. Each assignment is listed exactly; variant
          // forms of the same class are covered automatically.
          allow: [
            '[--tone-from:var(--terracotta-from)]',
            '[--tone-to:var(--terracotta-to)]',
            '[--tone:var(--terracotta)]',
            '[--tone-from:var(--blue-from)]',
            '[--tone-to:var(--blue-to)]',
            '[--tone:var(--blue)]',
            '[--tone-from:var(--rose-from)]',
            '[--tone-to:var(--rose-to)]',
            '[--tone:var(--rose)]',
            '[--tone-from:var(--ink-from)]',
            '[--tone-to:var(--ink-to)]',
            '[--tone:var(--ink)]',
            '[--tone-from:var(--emerald-from)]',
            '[--tone-to:var(--emerald-to)]',
            '[--tone:var(--emerald)]',
            '[--tone-from:var(--teal-from)]',
            '[--tone-to:var(--teal-to)]',
            '[--tone:var(--teal)]',
            '[--tone-from:var(--violet-from)]',
            '[--tone-to:var(--violet-to)]',
            '[--tone:var(--violet)]',
            '[--tone-from:var(--amber-from)]',
            '[--tone-to:var(--amber-to)]',
            '[--tone:var(--amber)]',
            '[transform:translate(calc(var(--k)*var(--spread)),calc(var(--k)*-14px))_rotate(calc(4deg_+_var(--k)*2.5deg))_scale(calc(1_-_var(--k)*0.035))]',
            'transition-[transform,opacity]',
            'ease-[cubic-bezier(.34,1.25,.5,1)]',
            'bg-linear-[160deg]',
            'data-[leaving]:[transform:translate(-90%,18px)_rotate(-14deg)]',
            // Material stage one-offs (landing/hero/material-stack.tsx):
            // tone-coupled card glow, card title size, prose measure.
            'shadow-[0_26px_50px_color-mix(in_oklab,var(--tone-to)_32%,transparent)]',
            'text-[2.75rem]',
            'leading-[1.1]',
            'leading-[1.2]',
            'max-w-[36ch]',
            'leading-[1.6]',
            '[--spread:18px]',
            'h-[470px]',
          ],
        },
      ],
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
