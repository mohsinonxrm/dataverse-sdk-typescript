// Heading anchors as GitHub makes them (lower case; punctuation and emoji dropped; spaces become
// hyphens), so the anchors in the repository's links, written for GitHub, work on the site too.
// VitePress' own slugs would differ for headings that start with an emoji or contain `$` or `.`.
export function slugify(text) {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{M}\p{N}\p{Pc}\- ]/gu, "")
    .replace(/ /g, "-");
}
