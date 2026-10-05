import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { resolve } from "path";

export function createViteLibraryConfig(
  packageDir: string,
  pkgManifest: Record<string, any>
) {
  const externalDeps = [
    ...Object.keys(pkgManifest.peerDependencies || {}),
    ...Object.keys(pkgManifest.dependencies || {}),
  ];

  return defineConfig({
    // resolve: {
    //   alias: {
    //     "@src": resolve(packageDir, "src"),
    //   },
    // },
    plugins: [
      dts({
        entryRoot: "src",
        tsconfigPath: resolve(packageDir, "tsconfig.json"),
      }),
    ],
    build: {
      lib: {
        entry: resolve(packageDir, "src/index.ts"),
        formats: ["es"],
        fileName: "index",
      },
      rollupOptions: {
        external: (id) =>
          externalDeps.some((dep) => id === dep || id.startsWith(`${dep}/`)),
      },
    },
  });
}
