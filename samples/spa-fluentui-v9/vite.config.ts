import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, normalizePath, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { operationStems, parseOperation, SUFFIX } from "./src/explorer/catalog/parse";
import { OPERATION_KINDS, PACKAGE_OF, type OperationKind } from "./src/explorer/types";

const here = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

const CATALOG = "virtual:operation-catalog/";
const PACKAGE = "virtual:explorer-package/";
const COPY = "?explorer-copy";

function kindOf(id: string, prefix: string): OperationKind {
  const kind = id.slice(prefix.length) as OperationKind;
  if (!OPERATION_KINDS.includes(kind)) throw new Error(`Unknown operation package: ${id}`);
  return kind;
}

/**
 * The explorer's lazily loaded modules:
 *
 * - `virtual:operation-catalog/<kind>`: the operations of the actions, functions or messages
 *   package (class, route, constructor arguments, parameters), read from the package source at
 *   build time. One chunk each, loaded when the visitor opens that package's list.
 * - `virtual:explorer-package/<kind>`: the whole package, to run any of its operations. It is a
 *   copy of the package's bundle under its own module id, so the scenario pages, which import a
 *   few classes from the same packages, keep their small tree-shaken chunks instead of sharing
 *   this one.
 */
function explorerModules(): Plugin {
  return {
    name: "explorer-modules",
    resolveId(id) {
      if (id.startsWith(CATALOG)) return `\0${id}`;
      if (id.startsWith(PACKAGE)) {
        return `${normalizePath(require.resolve(PACKAGE_OF[kindOf(id, PACKAGE)]))}${COPY}`;
      }
      return undefined;
    },
    load(id) {
      if (id.startsWith(`\0${CATALOG}`)) {
        const kind = kindOf(id.slice(1), CATALOG);
        const src = resolve(here, `../../packages/dataverse-sdk-${kind}/src`);
        const stems = operationStems(kind, readFileSync(join(src, "index.ts"), "utf8"));
        const operations = stems.flatMap((stem) => {
          const source = readFileSync(join(src, `${stem}${SUFFIX[kind].file}.ts`), "utf8");
          const op = parseOperation(kind, stem, source);
          return op ? [op] : [];
        });
        // JSON.parse of a string is faster for the browser than a large object literal.
        return `export default JSON.parse(${JSON.stringify(JSON.stringify(operations))});`;
      }
      if (id.endsWith(COPY)) return readFileSync(id.slice(0, -COPY.length), "utf8");
      return undefined;
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), explorerModules()],
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  },
  build: {
    outDir: "dist",
    sourcemap: true,
    // Each scenario page is its own chunk (React.lazy); the shell stays small. The largest chunks
    // are the code editor (Monaco, about 2.9 MB, loaded the first time code is shown; the e2e
    // tests hold it to a budget) and the operation packages the explorer loads on demand.
    chunkSizeWarningLimit: 3100,
    rolldownOptions: {
      output: {
        // Named so you can tell them apart in the network panel (and the e2e tests can).
        chunkFileNames(chunk) {
          const id = chunk.facadeModuleId ?? "";
          const pkg = /dataverse-sdk-(\w+)\/dist\/index\.js\?explorer-copy$/.exec(id);
          if (pkg) return `assets/package-${pkg[1]}-[hash].js`;
          if (id.startsWith(`\0${CATALOG}`)) return `assets/catalog-${chunk.name}-[hash].js`;
          return "assets/[name]-[hash].js";
        },
      },
    },
  },
});
