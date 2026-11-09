/**
 * Builds the app once for every e2e file and serves the build with `vite preview`, sending the
 * response headers of `public/staticwebapp.config.json` (the Content-Security-Policy among them),
 * so the tests run the app as Azure Static Web Apps serves it.
 */
import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { build, preview } from "vite";
import type { TestProject } from "vitest/node";

declare module "vitest" {
  export interface ProvidedContext {
    baseUrl: string;
  }
}

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");

export default async function setup(project: TestProject): Promise<() => Promise<void>> {
  const outDir = mkdtempSync(join(tmpdir(), "spa-e2e-"));
  const { globalHeaders } = JSON.parse(
    readFileSync(join(root, "public/staticwebapp.config.json"), "utf8")
  ) as { globalHeaders: Record<string, string> };
  // envDir points at a folder without .env, so a developer's sign-in settings don't apply.
  const shared = {
    root,
    configFile: join(root, "vite.config.ts"),
    envDir: join(root, "test/e2e"),
    logLevel: "warn" as const,
  };
  await build({ ...shared, build: { outDir, emptyOutDir: true, sourcemap: false } });
  const server = await preview({
    ...shared,
    build: { outDir },
    preview: { port: 0, host: "127.0.0.1", strictPort: false, headers: globalHeaders },
  });
  const url = server.resolvedUrls?.local[0];
  if (!url) throw new Error("preview server has no URL");
  project.provide("baseUrl", url);
  return () => new Promise<void>((done) => server.httpServer.close(() => done()));
}
