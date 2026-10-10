# React Monorepo Documentation

This repository is structured as a monorepo, allowing multiple applications and shared packages to co-exist within a single codebase. Below is a breakdown of the configuration tools used to manage this architecture, alongside instructions for deploying to npm-only environments and orchestrating automated releases.

## Configuration Tooling Overview

- **pnpm Workspaces & Catalogs (`pnpm-workspace.yaml` & `package.json`)**:
  - The workspace is structured to automatically include all projects located within the `apps/*` and `packages/*` directories[cite: 5].
  - The repository enforces `pnpm@9.15.0` as the package manager[cite: 4].
  - It utilizes pnpm's `catalog` feature to centralize dependency versions (such as React, Cesium, and Vite), preventing version mismatches across different workspace packages[cite: 5]. These are consumed in the root `package.json` using the `"catalog:"` protocol[cite: 4].
- **Turborepo (`turbo.json`)**:
  - Turborepo orchestrates task execution, defining pipelines for `build`, `dev`, `lint`, and `typecheck`[cite: 7].
  - The `build` and `typecheck` tasks rely on topological dependencies (using `"^build"`), meaning dependencies are built before the packages that rely on them[cite: 7].
  - Outputs in the `dist/**` folders are cached during the build task[cite: 7], while the `dev` task is marked as persistent with caching disabled to support long-running development servers[cite: 7].
  - The `lint` task tracks source files, `eslint.config.js`, `tsconfig.json`, and `package.json` to determine if a run can be cached[cite: 7].
- **TypeScript (`tsconfig.json`)**:
  - The TypeScript configuration targets `ES2022` and `ESNext` modules using `bundler` resolution[cite: 6].
  - It enables strict type-checking, declaration generation, and source map generation[cite: 6].
  - Root-level configuration files, including `eslint.config.js` and `vite.config.base.ts`, are explicitly included in the compiler scope[cite: 6].
- **Vite Library Builder (`vite.config.base_2.ts`)**:
  - The repository exposes a reusable `createViteLibraryConfig` function to standardize how individual packages are bundled[cite: 8].
  - It utilizes `vite-plugin-dts` to automatically emit type declarations alongside the build[cite: 8].
  - The configuration dynamically reads a package's manifest to externalize `dependencies` and `peerDependencies`, preventing them from being bundled into the final ES module output[cite: 8].
- **ESLint Flat Config (`eslint.config_2.js`)**:
  - The repository employs the modern ESLint flat configuration pattern, integrating standard rules from `@eslint/js`, `typescript-eslint`, and `@eslint-react/eslint-plugin`[cite: 3].
  - It utilizes the TypeScript ESLint `projectService` to seamlessly parse TypeScript files[cite: 3].
  - Specific configuration files, such as `eslint.config.js`, have the `projectService` explicitly disabled, while build output directories (`dist`, `.turbo`, `coverage`, and `node_modules`) are universally ignored[cite: 3].

---

## Deployment: Exporting to NPM-Only Environments

If your deployment target (e.g., AWS Elastic Beanstalk, Heroku) strictly requires `npm` and does not support `pnpm` workspaces, you can isolate a specific application and generate a standard `npm` environment prior to deployment.

1.  **Isolate the Package**: Use pnpm's `deploy` command to extract the target application and all of its local workspace dependencies into a standalone directory.
    ```bash
    pnpm --filter <app-name> deploy ./out
    ```
2.  **Generate a Lockfile**: Navigate into the isolated directory and generate a standard `package-lock.json` without re-downloading the `node_modules`.
    ```bash
    cd ./out
    npm install --package-lock-only
    ```
3.  **Deploy**: Push the `./out` directory to your deployment target. The host environment will now see a standard Node project with a valid `package-lock.json` and will execute `npm install` successfully.

---

## Multi-Package Semantic Release Workflow

While the repository includes the `changeset` CLI for manual versioning workflows[cite: 4], fully automated semantic releases across a monorepo require a specialized wrapper like `multi-semantic-release`. Standard `semantic-release` is designed for single-package repositories, but the multi-package wrapper enables topological version bumping and local dependency synchronization.

### 1. Installation

Install the wrapper and the standard semantic-release plugins at the workspace root:

```bash
pnpm add -D -w multi-semantic-release semantic-release @semantic-release/commit-analyzer @semantic-release/release-notes-generator @semantic-release/npm @semantic-release/github
```
