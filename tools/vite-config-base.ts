import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'node:path';

interface PackageManifest {
  dependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
}

/**
 * Generates a Vite configuration for monorepo library packages.
 *
 * Automatically sets up library build mode, TypeScript declaration generation (.d.ts),
 * and configures Rollup to externalize all dependencies and peer dependencies defined
 * in the provided package manifest.
 *
 * @param packageDir - The absolute path to the library's root directory (e.g., `import.meta.dirname`).
 * @param pkgManifest - The parsed contents of the library's `package.json`.
 * @returns A Vite configuration object tailored for package distribution.
 */
export function createViteLibraryConfig(packageDir: string, pkgManifest: PackageManifest) {
  const externalDeps = [
    ...Object.keys(pkgManifest.peerDependencies || {}),
    ...Object.keys(pkgManifest.dependencies || {}),
  ];

  return defineConfig({
    plugins: [
      dts({
        entryRoot: 'src',
        tsconfigPath: resolve(packageDir, 'tsconfig.json'),
      }),
    ],
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
  });
}
