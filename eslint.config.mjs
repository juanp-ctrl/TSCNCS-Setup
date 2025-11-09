import { tanstackConfig } from '@tanstack/eslint-config'
import convexPlugin from '@convex-dev/eslint-plugin'

export default [
  ...tanstackConfig,
  ...convexPlugin.configs.recommended,
  {
    ignores: ['convex/_generated/**', 'app/routeTree.gen.ts', '.output/**', 'dist/**', 'node_modules/**'],
  },
]
