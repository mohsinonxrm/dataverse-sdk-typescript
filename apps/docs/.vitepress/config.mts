import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { transformerTwoslash } from "@shikijs/vitepress-twoslash";
import ts from "typescript";
import { defineConfig, type DefaultTheme } from "vitepress";
import { guide, packages } from "../pages.mjs";
import { slugify } from "../slugify.mjs";

// Written by TypeDoc (typedoc-vitepress-theme) before dev and build
const apiSidebar = JSON.parse(
  readFileSync(new URL("../content/api/typedoc-sidebar.json", import.meta.url), "utf8")
) as DefaultTheme.SidebarItem[];

const GITHUB = "https://github.com/mohsinonxrm/dataverse-sdk-typescript";
const EXPLORER = "https://dataverse-sdk.mohsinonxrm.com";

export default defineConfig({
  title: "Dataverse SDK for TypeScript",
  description: "A modern TypeScript SDK for Microsoft Dataverse, for Node.js and browsers.",
  lang: "en-US",
  // Served at /docs on the explorer's Static Web App (.github/workflows/site.yml)
  base: "/docs/",
  // The Markdown is built into content/ by scripts/content.mjs and TypeDoc
  srcDir: "content",
  // Pages end in .html: Static Web Apps serves them as they are, no rewrite rules needed
  cleanUrls: false,
  lastUpdated: false,
  // Page metadata goes in a script file instead of an inline script (Content-Security-Policy)
  metaChunk: true,
  head: [["link", { rel: "icon", type: "image/svg+xml", href: "/docs/favicon.svg" }]],
  // The local search index (~5 MB, ~1 MB gzipped) is one chunk, loaded when search first opens
  vite: { build: { chunkSizeWarningLimit: 6000 } },
  markdown: {
    // The repository's links use GitHub's heading anchors
    anchor: { slugify },
    codeTransformers: [
      transformerTwoslash({
        twoslashOptions: {
          compilerOptions: {
            module: ts.ModuleKind.ESNext,
            moduleResolution: ts.ModuleResolutionKind.Bundler,
            target: ts.ScriptTarget.ES2022,
            types: ["node"],
            strict: true,
          },
        },
      }),
    ],
  },
  // The site's Content-Security-Policy allows scripts from the site only (script-src 'self').
  // VitePress puts two small inline scripts in each page's <head> (the saved light or dark
  // appearance, applied before the page paints, and a macOS flag for the search shortcut): move
  // each into a file of its own, loaded the same way (blocking, in the <head>), so they still run
  // before the page paints. scripts/check-csp.mjs checks that no inline script is left.
  transformHtml(html, _id, { siteConfig }) {
    return html.replace(
      /<script\b([^>]*)>([\s\S]*?)<\/script>/g,
      (tag, attrs: string, body: string) => {
        if (/\bsrc=/.test(attrs) || /type="application\/(ld\+)?json"/.test(attrs) || !body.trim()) {
          return tag;
        }
        const hash = createHash("sha256").update(body).digest("hex").slice(0, 10);
        const name = `assets/inline.${hash}.js`;
        const file = path.join(siteConfig.outDir, name);
        mkdirSync(path.dirname(file), { recursive: true });
        writeFileSync(file, body);
        return `<script${attrs} src="${siteConfig.site.base}${name}"></script>`;
      }
    );
  },
  transformPageData(pageData) {
    // "Edit this page" opens the repository file the page is built from (frontmatter added by
    // scripts/content.mjs). editLink.pattern stays a string: a function would be rebuilt in the
    // browser with new Function(), which the Content-Security-Policy (no 'unsafe-eval') blocks.
    const source = pageData.frontmatter.source as string | undefined;
    if (source) pageData.filePath = source;
    // The home page and the generated API reference have no file to edit
    else pageData.frontmatter.editLink = false;
  },
  themeConfig: {
    logo: "/favicon.svg",
    nav: [
      { text: "Guide", link: "/guide/getting-started", activeMatch: "^/guide/" },
      { text: "Packages", link: "/packages/core", activeMatch: "^/packages/" },
      { text: "API", link: "/api/", activeMatch: "^/api/" },
      { text: "Explorer", link: EXPLORER },
      { text: "GitHub", link: GITHUB },
    ],
    search: { provider: "local" },
    editLink: {
      // :path is the page's filePath, set to its repository file by transformPageData
      pattern: `${GITHUB}/edit/dev/:path`,
      text: "Edit this page on GitHub",
    },
    outline: [2, 3],
    sidebar: {
      "/guide/": guide.map((group) => ({
        text: group.text,
        collapsed: group.collapsed,
        items: group.items.map(([, route, text]) => ({ text, link: `/guide/${route}` })),
      })),
      "/packages/": packages.map((group) => ({
        text: group.text,
        items: group.items.map((name) => ({
          text: `dataverse-sdk-${name}`,
          link: `/packages/${name}`,
        })),
      })),
      // The packages on the reference's index, and each package's own items on its pages (the
      // sidebar is in every page's HTML: all ~600 items on every page would make it 270 KB each)
      "/api/": [
        {
          text: "API reference",
          link: "/api/",
          items: apiSidebar.map(({ text, link }) => ({ text, link })),
        },
      ],
      ...Object.fromEntries(
        apiSidebar.map((pkg) => [
          pkg.link!.replace(/(index\.md)?$/, ""),
          [
            { text: "API reference", link: "/api/" },
            { text: pkg.text, link: pkg.link, items: pkg.items },
          ],
        ])
      ),
    },
    footer: {
      message: `Released under the <a href="${GITHUB}/blob/main/LICENSE">AGPL-3.0 License</a>.`,
    },
  },
});
