import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { PluginOption } from 'vite';
import dts from 'vite-plugin-dts';

/**
 * Vite plugin preset for monorepo library submodules.
 *
 * Automatically configures Vite for library mode (`build.lib`), generates TypeScript
 * declarations (`.d.ts`), and prevents bundling of external dependencies by dynamically
 * reading `dependencies` and `peerDependencies` from the executing module's `package.json`.
 */
export function monorepoLibraryPlugin(): PluginOption[] {
  const packageDir = process.cwd();
  const pkgPath = resolve(packageDir, 'package.json');
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));

  const externalDeps = [
    ...Object.keys(pkg.peerDependencies || {}),
    ...Object.keys(pkg.dependencies || {}),
  ];

  return [
    {
      name: 'monorepo-library-config',
      config() {
        return {
          build: {
            lib: {
              entry: resolve(packageDir, 'src/index.ts'),
              formats: ['es'],
              fileName: 'index',
            },
            rollupOptions: {
              external: (id) => externalDeps.some((dep) => id === dep || id.startsWith(`${dep}/`)),
            },
          },
        };
      },
    },
    dts({
      entryRoot: 'src',
      tsconfigPath: resolve(packageDir, 'tsconfig.json'),
    }),
  ];
}
