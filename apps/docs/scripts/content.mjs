// Builds the site's Markdown in content/ (gitignored) from the repository's own files, which stay
// the only source: docs/**, the package READMEs, and a section of the root README for the home
// page. Nothing in docs/ needs frontmatter or site-specific syntax; what the site needs is done
// here, on the copies:
//
// - relative links: to another page of the site → that page; to anything else in the repository
//   → GitHub (blob/main or tree/main); to a file that doesn't exist → the build fails;
// - frontmatter: `source` (for "Edit this page"), and a `title` when the file has no `# ` heading;
// - `Foo<T>` in prose (not in code) is escaped: VitePress compiles each page as a Vue template,
//   where `<T>` would be an unclosed element;
// - the code blocks listed in TWOSLASH become `ts twoslash` blocks (type information on hover),
//   with the names they use but don't declare declared above a `// ---cut---` line. The blocks in
//   docs/ stay as they are, so the repository's examples check sees them unchanged.
//
// Usage: node scripts/content.mjs
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { pageMap } from "../pages.mjs";
import { slugify } from "../slugify.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const site = path.resolve(here, "..");
const repo = path.resolve(site, "../..");
const out = path.join(site, "content");
const GITHUB = "https://github.com/mohsinonxrm/dataverse-sdk-typescript";
const RAW = "https://raw.githubusercontent.com/mohsinonxrm/dataverse-sdk-typescript";

const pages = pageMap();
/** The root README's section that the home page shows (from this heading to the next `## `). */
const HOME_SECTION = "## 📦 Which package do I need?";

/** Names the twoslash blocks use without declaring them (as in the examples check). */
const DECLARE = {
  client: 'declare const client: import("@mohsinonxrm/dataverse-sdk-core").DataverseClient;',
  tokenProvider:
    'declare const tokenProvider: import("@mohsinonxrm/dataverse-sdk-core").AccessTokenProvider;',
  accountId: "declare const accountId: string;",
  opportunityId: "declare const opportunityId: string;",
  Account: "interface Account { name: string; accountnumber?: string; revenue?: number }",
};

/**
 * The code blocks shown with twoslash: the first TypeScript block under `heading` in `file`, with
 * the names in `declare` declared. A block that doesn't compile fails the build; an entry that
 * matches no block fails it too, so a renamed heading is noticed.
 */
const TWOSLASH = [
  { file: "docs/getting-started.md", heading: "Device Code Flow (CLI Applications)", declare: [] },
  {
    file: "docs/getting-started.md",
    heading: "Client Credentials Flow (Daemon Applications)",
    declare: [],
  },
  { file: "docs/getting-started.md", heading: "Create a Record", declare: ["client"] },
  {
    file: "docs/getting-started.md",
    heading: "Retrieve a Record",
    declare: ["client", "accountId"],
  },
  { file: "docs/getting-started.md", heading: "Filter, Sort, and Paginate", declare: ["client"] },
  { file: "packages/dataverse-sdk-core/README.md", heading: "Quick Start", declare: ["Account"] },
  {
    file: "packages/dataverse-sdk-batch/README.md",
    heading: "Quick Start",
    declare: ["tokenProvider"],
  },
  { file: "packages/dataverse-sdk-functions/README.md", heading: "WhoAmI", declare: ["client"] },
  {
    file: "packages/dataverse-sdk-actions/README.md",
    heading: "WinOpportunity",
    declare: ["client", "opportunityId"],
  },
];

const FENCE = /^(\s*)(`{3,}|~{3,})(.*)$/;
const HEADING = /^(#{1,6})\s+(.*?)\s*#*\s*$/;

/** The anchors of a Markdown file's headings, as the site (and GitHub) make them. */
function anchors(md) {
  const seen = new Map();
  const result = new Set();
  forEachProseLine(md, (line) => {
    const h = HEADING.exec(line);
    if (!h) return;
    const base = slugify(stripInline(h[2]));
    const n = seen.get(base) ?? 0;
    seen.set(base, n + 1);
    result.add(n ? `${base}-${n}` : base);
  });
  return result;
}

/** Heading text as it renders: no links, code ticks or emphasis markers. */
function stripInline(text) {
  return text
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[`*_]/g, "")
    .replace(/<[^>]+>/g, "");
}

function forEachProseLine(md, fn) {
  let fence;
  for (const line of md.split("\n")) {
    const f = FENCE.exec(line);
    if (fence) {
      if (f && f[2][0] === fence[0] && f[2].length >= fence.length && !f[3].trim())
        fence = undefined;
      continue;
    }
    if (f) {
      fence = f[2];
      continue;
    }
    fn(line);
  }
}

/** Applies `fn` to the parts of a prose line that aren't inline code. */
function outsideCode(line, fn) {
  return line
    .split(/(`+[^`]*`+)/)
    .map((part, i) => (i % 2 ? part : fn(part)))
    .join("");
}

const warnings = [];
let rewritten = 0;

function rewriteTarget(src, target, homeAnchors) {
  if (/^[a-z][a-z0-9+.-]*:/i.test(target) || target.startsWith("#") || target.startsWith("/")) {
    return target;
  }
  const [rawPath, hash] = target.split("#");
  const anchor = hash ? `#${hash}` : "";
  let resolved = path.posix
    .normalize(path.posix.join(path.posix.dirname(src), decodeURI(rawPath)))
    .replace(/\/$/, "");
  if (resolved.startsWith("..")) throw new Error(`${src}: link outside the repository: ${target}`);
  if (!pages[resolved] && pages[`${resolved}/README.md`]) resolved = `${resolved}/README.md`;
  rewritten++;
  if (pages[resolved]) {
    checkAnchor(src, target, resolved, hash);
    return `/${pages[resolved]}${anchor}`;
  }
  if (resolved === "README.md" && hash && homeAnchors.has(hash)) return `/${anchor}`;
  const file = path.join(repo, resolved);
  if (!existsSync(file)) throw new Error(`${src}: link to a missing file: ${target}`);
  const encoded = resolved.split("/").map(encodeURIComponent).join("/");
  if (statSync(file).isDirectory()) return `${GITHUB}/tree/main/${encoded}${anchor}`;
  if (/\.(png|jpe?g|gif|svg|webp)$/i.test(resolved)) return `${RAW}/main/${encoded}`;
  return `${GITHUB}/blob/main/${encoded}${anchor}`;
}

const anchorCache = new Map();
function checkAnchor(src, target, file, hash) {
  if (!hash) return;
  if (!anchorCache.has(file)) anchorCache.set(file, anchors(read(file)));
  if (!anchorCache.get(file).has(hash))
    warnings.push(`${src}: no heading for the anchor: ${target}`);
}

function rewriteLinks(src, line, homeAnchors) {
  const fix = (target) => rewriteTarget(src, target, homeAnchors);
  // [text](target "title"), ![alt](target)
  line = line.replace(
    /\]\(<?([^)\s>]+)>?((?:\s+"[^"]*")?)\)/g,
    (_, t, title) => `](${fix(t)}${title})`
  );
  // <a href="target">, <img src="target">
  line = line.replace(/\b(href|src)="([^"]+)"/g, (_, attr, t) => `${attr}="${fix(t)}"`);
  // [label]: target
  line = line.replace(/^(\s*\[[^\]]+\]:\s*)(\S+)/, (_, label, t) => `${label}${fix(t)}`);
  return line;
}

function read(file) {
  return readFileSync(path.join(repo, file), "utf8").replace(/\r\n/g, "\n");
}

/** The page's Markdown, with the changes described at the top of this file. */
function transform(src, md, homeAnchors) {
  const lines = md.split("\n");
  const twoslash = TWOSLASH.filter((t) => t.file === src).map((t) => ({ ...t, state: "heading" }));
  const result = [];
  let fence;
  for (const line of lines) {
    const f = FENCE.exec(line);
    if (fence) {
      if (f && f[2][0] === fence[0] && f[2].length >= fence.length && !f[3].trim())
        fence = undefined;
      result.push(line);
      continue;
    }
    if (f) {
      fence = f[2];
      const lang = f[3].trim().split(/\s+/)[0];
      const target = twoslash.find((t) => t.state === "fence");
      if (target && (lang === "ts" || lang === "typescript")) {
        target.state = "done";
        result.push(`${f[1]}${f[2]}ts twoslash`);
        result.push(...target.declare.map((name) => DECLARE[name]));
        result.push("export {};", "// ---cut---");
        continue;
      }
      result.push(line);
      continue;
    }
    const h = HEADING.exec(line);
    if (h) {
      for (const t of twoslash) {
        if (t.state === "heading" && stripInline(h[2]) === t.heading) t.state = "fence";
        else if (t.state === "fence") t.state = "heading"; // no TypeScript block under it
      }
    }
    result.push(
      outsideCode(rewriteLinks(src, line, homeAnchors), (part) =>
        part.replace(/(\w)<(?=[A-Za-z_])/g, "$1\\<")
      )
    );
  }
  for (const t of twoslash) {
    if (t.state !== "done")
      throw new Error(`twoslash: no TypeScript block under "${t.heading}" in ${src}`);
  }
  return result.join("\n");
}

function frontmatter(fields) {
  const entries = Object.entries(fields).filter(([, v]) => v !== undefined);
  return `---\n${entries.map(([k, v]) => `${k}: ${JSON.stringify(v)}`).join("\n")}\n---\n\n`;
}

function write(route, md) {
  const file = path.join(out, `${route}.md`);
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, md);
}

// Start afresh, except for the API reference: TypeDoc writes (and cleans) content/api itself
mkdirSync(out, { recursive: true });
for (const entry of readdirSync(out)) {
  if (entry !== "api") rmSync(path.join(out, entry), { recursive: true, force: true });
}

// The explorer's icon
mkdirSync(path.join(out, "public"), { recursive: true });
copyFileSync(
  path.join(repo, "samples/spa-fluentui-v9/public/favicon.svg"),
  path.join(out, "public/favicon.svg")
);

// The home page: home.md (hero and features) and the root README's package table
const readme = read("README.md");
const start = readme.indexOf(`\n${HOME_SECTION}\n`);
if (start < 0) throw new Error(`README.md has no "${HOME_SECTION}" section`);
const end = readme.indexOf("\n## ", start + 1);
const section = readme.slice(start + 1, end < 0 ? undefined : end).trimEnd();
const homeAnchors = anchors(section);
const home = readFileSync(path.join(site, "home.md"), "utf8").replace(/\r\n/g, "\n");
write("index", `${home.trimEnd()}\n\n${transform("README.md", section, homeAnchors)}\n`);

for (const [src, route] of Object.entries(pages)) {
  const md = read(src);
  const title = /^# /m.test(md)
    ? undefined
    : stripInline(HEADING.exec(md.split("\n").find((l) => HEADING.test(l)) ?? "")?.[2] ?? "");
  write(route, frontmatter({ title, source: src }) + transform(src, md, homeAnchors));
}

console.log(
  `content: ${Object.keys(pages).length + 1} pages, ${rewritten} relative links rewritten`
);
for (const w of warnings) console.warn(`warning: ${w}`);
