// vite.config.base.ts
import { defineConfig, type UserConfig } from "vite";
import dts from "vite-plugin-dts";
import { resolve } from "path";
import { readFileSync } from "fs";

export function createPackageConfig(
  packageDir: string,
  extraConfig: UserConfig = {}
): UserConfig {
  const pkg = JSON.parse(
    readFileSync(resolve(packageDir, "package.json"), "utf-8")
  );

  return defineConfig({
    plugins: [
      dts({
        bundleTypes: true,
        entryRoot: resolve(packageDir, "src"),
      }),
      ...(extraConfig.plugins || []),
    ],
    build: {
      lib: {
        entry: resolve(packageDir, "src/index.ts"),
        formats: ["es", "cjs"],
        fileName: (format) => `index.${format === "es" ? "es" : "cjs"}.js`,
      },
      rollupOptions: {
        external: [
          "react",
          "react-dom",
          "react/jsx-runtime",
          ...Object.keys(pkg.dependencies || {}),
          ...Object.keys(pkg.peerDependencies || {}),
        ],
        ...extraConfig.build?.rollupOptions,
      },
      ...extraConfig.build,
    },
    ...extraConfig,
  });
}
