import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'node:path';

interface PackageManifest {
  dependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
}

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
