// The site's pages: which repository file each one is built from, and where it goes. Used by
// scripts/content.mjs (to copy and rewrite the files) and .vitepress/config.mts (the sidebars).
// A repository Markdown file that isn't listed here isn't on the site; links to it go to GitHub.

/** The guide: user-facing files of docs/, grouped as in the sidebar. Routes are under /guide/. */
export const guide = [
  {
    text: "Guide",
    items: [
      ["docs/getting-started.md", "getting-started", "Getting started"],
      ["docs/browser.md", "browser", "In the browser"],
      ["docs/migration-2.0.md", "migration-2.0", "Migrating to 2.0"],
      ["docs/SDK-USAGE-PATTERNS.md", "usage-patterns", "Usage patterns"],
      ["docs/api/metadata-operations.md", "metadata-operations", "Metadata operations"],
      ["docs/samples/README.md", "samples", "Samples"],
      ["docs/site.md", "explorer-site", "The explorer site"],
    ],
  },
  {
    text: "Mapping and reference",
    items: [
      ["docs/mapping/bulk-vs-batch.md", "mapping/bulk-vs-batch", "Bulk vs $batch"],
      ["docs/mapping/message-to-webapi.md", "mapping/message-to-webapi", ".NET SDK and messages"],
      ["docs/mapping/supported-operations.md", "mapping/supported-operations", "Operations"],
      ["docs/mapping/supported-actions.md", "mapping/supported-actions", "Actions"],
      ["docs/mapping/supported-functions.md", "mapping/supported-functions", "Functions"],
      ["docs/mapping/supported-messages.md", "mapping/supported-messages", "Messages"],
    ],
  },
  {
    text: "Testing",
    items: [
      ["docs/testing/testing-strategy.md", "testing/testing-strategy", "Testing strategy"],
      ["docs/testing/test-matrix.md", "testing/test-matrix", "Test matrix"],
    ],
  },
  {
    text: "Architecture decisions",
    collapsed: true,
    items: [
      ["docs/adr/0001-architecture.md", "adr/0001-architecture", "0001 Architecture"],
      ["docs/adr/0002-typed-metadata.md", "adr/0002-typed-metadata", "0002 Typed metadata"],
      [
        "docs/adr/0003-actions-functions.md",
        "adr/0003-actions-functions",
        "0003 Actions and functions",
      ],
      ["docs/adr/0004-messages.md", "adr/0004-messages", "0004 Messages"],
      ["docs/adr/0005-file-image-operations.md", "adr/0005-file-image-operations", "0005 Files"],
      ["docs/adr/0006-bulk-operations.md", "adr/0006-bulk-operations", "0006 Bulk operations"],
      [
        "docs/adr/0007-versioning-release.md",
        "adr/0007-versioning-release",
        "0007 Versioning and release",
      ],
      [
        "docs/adr/0008-telemetry-observability.md",
        "adr/0008-telemetry-observability",
        "0008 Telemetry",
      ],
      [
        "docs/adr/0009-typed-request-builders.md",
        "adr/0009-typed-request-builders",
        "0009 Typed request builders",
      ],
    ],
  },
];

/** The published packages, grouped as in the root README. Routes are /packages/<short name>. */
export const packages = [
  { text: "Main path", items: ["core", "actions", "functions", "generator", "entities-runtime"] },
  { text: "Specialised clients", items: ["batch", "metadata", "files", "discovery"] },
  { text: "Authentication", items: ["auth-msal-node", "auth-msal-browser", "auth-azure-identity"] },
  { text: "Telemetry", items: ["otel", "appinsights"] },
  { text: ".NET compatibility layer", items: ["xrm", "messages"] },
];

export const packageNames = packages.flatMap((group) => group.items);

/** Repository file → route (without the leading slash or an extension). */
export function pageMap() {
  const map = {};
  for (const group of guide) for (const [file, route] of group.items) map[file] = `guide/${route}`;
  for (const name of packageNames)
    map[`packages/dataverse-sdk-${name}/README.md`] = `packages/${name}`;
  return map;
}
