// Checks the built site against the explorer site's Content-Security-Policy, which it is served
// under (samples/spa-fluentui-v9/public/staticwebapp.config.json):
//
// - every inline <script> of every page must be allowed by script-src (by its hash). The policy
//   allows none (script-src 'self'): transformHtml in .vitepress/config.mts moves VitePress' own
//   inline scripts into files, so a new one here is something that bypassed it;
// - the site config must hold no function (an editLink.pattern function, say): VitePress rebuilds
//   those in the browser with new Function(), which needs 'unsafe-eval'.
//
// Usage: node scripts/check-csp.mjs (after `vitepress build`)
import { createHash } from "node:crypto";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const site = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(site, ".vitepress/dist");
const swaConfig = path.resolve(
  site,
  "../../samples/spa-fluentui-v9/public/staticwebapp.config.json"
);

const csp = JSON.parse(readFileSync(swaConfig, "utf8")).globalHeaders["Content-Security-Policy"];
const scriptSrc = /(?:^|;)\s*script-src([^;]*)/.exec(csp)?.[1].trim().split(/\s+/) ?? [];
if (scriptSrc.includes("'unsafe-inline'") || scriptSrc.includes("'unsafe-eval'")) {
  throw new Error(`check-csp: expected a strict script-src in ${swaConfig}`);
}

const blocked = new Map();
const evaluated = [];
let pages = 0;
for (const entry of readdirSync(dist, { recursive: true })) {
  if (entry.endsWith(".js") && /"_vp-fn_[^"]/.test(readFileSync(path.join(dist, entry), "utf8"))) {
    evaluated.push(entry);
  }
  if (!entry.endsWith(".html")) continue;
  pages++;
  const html = readFileSync(path.join(dist, entry), "utf8");
  for (const [, attrs, body] of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)) {
    if (/\bsrc=/.test(attrs) || /type="application\/(ld\+)?json"/.test(attrs)) continue;
    const hash = `'sha256-${createHash("sha256").update(body, "utf8").digest("base64")}'`;
    if (!scriptSrc.includes(hash)) blocked.set(hash, `${entry}: ${body.slice(0, 80)}`);
  }
}

if (evaluated.length) {
  console.error("check-csp: the site config has functions, which need 'unsafe-eval' to run:");
  for (const file of evaluated) console.error(`  ${file}`);
  console.error("Use strings (or transformPageData) in .vitepress/config.mts instead.");
}
if (blocked.size) {
  console.error("check-csp: inline scripts the Content-Security-Policy blocks:");
  for (const [hash, where] of blocked) console.error(`  ${hash} (e.g. ${where})`);
  console.error("Move them into files (transformHtml in .vitepress/config.mts).");
}
if (evaluated.length || blocked.size) process.exit(1);
console.log(`check-csp: ${pages} pages, no inline script and no eval`);
