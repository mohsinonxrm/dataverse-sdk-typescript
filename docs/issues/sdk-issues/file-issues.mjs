#!/usr/bin/env node
// Files the issues in this folder with the GitHub CLI (gh), creating labels first.
// Usage: node file-issues.mjs --repo owner/name [--dry-run]
// Each NN-*.md: line 1 "# <title>", line 2 "<!-- labels: a,b -->", then the body.
// 00-tracking.md is filed last, with {{P0}}/{{P1}}/{{P2}} replaced by task lists of the new issue numbers.
import { readdirSync, readFileSync, writeFileSync, mkdtempSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const dir = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const repo = args[args.indexOf("--repo") + 1];
const dryRun = args.includes("--dry-run");
if (!repo || repo.startsWith("--")) throw new Error("--repo owner/name is required");

const LABELS = {
	bug: "d73a4a",
	enhancement: "a2eeef",
	documentation: "0075ca",
	question: "d876e3",
	testing: "fbca04",
	tracking: "5319e7",
	"needs-verification": "e4e669",
	browser: "1d76db",
	generator: "c5def5",
	"fetchxml-studio": "0e8a16",
	P0: "b60205",
	P1: "d93f0b",
	P2: "fbca04",
};
const parse = (file) => {
	const [first, second, ...rest] = readFileSync(join(dir, file), "utf8").split("\n");
	const labels = (/labels:\s*([^>]*)-->/.exec(second)?.[1] ?? "")
		.split(",")
		.map((l) => l.trim())
		.filter(Boolean);
	return { file, title: first.replace(/^#\s*/, ""), labels, body: rest.join("\n").trim() + "\n" };
};
const gh = (ghArgs) => {
	if (dryRun) {
		console.log(
			"gh",
			ghArgs.map((a) => (a.length > 80 ? a.slice(0, 77) + "..." : a)).join(" "),
		);
		return "https://github.com/" + repo + "/issues/0";
	}
	return execFileSync("gh", ghArgs, { encoding: "utf8" }).trim();
};

const issues = readdirSync(dir)
	.filter((f) => /^\d\d-.+\.md$/.test(f) && f !== "00-tracking.md")
	.sort()
	.map(parse);
const allLabels = new Set(issues.flatMap((i) => i.labels).concat(["tracking", "fetchxml-studio"]));
for (const label of allLabels) {
	gh([
		"label",
		"create",
		label,
		"--repo",
		repo,
		"--force",
		"--color",
		LABELS[label] ?? (label.startsWith("pkg:") ? "bfdadc" : "ededed"),
	]);
}

const tmp = mkdtempSync(join(tmpdir(), "sdk-issues-"));
const filed = [];
for (const issue of issues) {
	const bodyFile = join(tmp, issue.file);
	writeFileSync(bodyFile, issue.body);
	const url = gh([
		"issue",
		"create",
		"--repo",
		repo,
		"--title",
		issue.title,
		"--body-file",
		bodyFile,
		...issue.labels.flatMap((l) => ["--label", l]),
	]);
	filed.push({ ...issue, url, number: url.split("/").pop() });
	console.log(`${issue.file} -> ${url}`);
}

const tracking = parse("00-tracking.md");
let body = tracking.body;
for (const p of ["P0", "P1", "P2"]) {
	const list = filed
		.filter((i) => i.labels.includes(p))
		.map((i) => `- [ ] #${i.number} ${i.title}`)
		.join("\n");
	body = body.replace(`{{${p}}}`, list || "_none_");
}
const trackingFile = join(tmp, "00-tracking.md");
writeFileSync(trackingFile, body);
console.log(
	"00-tracking.md ->",
	gh([
		"issue",
		"create",
		"--repo",
		repo,
		"--title",
		tracking.title,
		"--body-file",
		trackingFile,
		...tracking.labels.flatMap((l) => ["--label", l]),
	]),
);
