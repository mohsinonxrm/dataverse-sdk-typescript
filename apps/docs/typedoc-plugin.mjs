// TypeDoc plugin for the API reference.
//
// - Module names: the entry points are files (the packages' built .d.ts, or src/index.ts for the
//   generated packages), so TypeDoc names the modules after their paths
//   ("dataverse-sdk-core/dist"); name them after the package and subpath export instead.
// - The generated packages (actions, functions, messages) export one class per Web API operation
//   with its parameter and response types, and the ~1,200 types of the Dataverse $metadata:
//   over 10,000 pages, more than the site can hold. Their reference keeps what is written by
//   hand (the messages base classes and CRUD messages, queryFunctions) and points to the lists of
//   operations in the guide and to the explorer for the rest.
// - Third-party doc comments: a type re-exported from a dependency (auth-msal-browser re-exports
//   MSAL's PopupRequest, …) keeps that package's TSDoc, whose relative links point into its own
//   repository (`[login-user.md](../../../docs/login-user.md)` in msal-browser 5) and are dead
//   links on this site. In comments from node_modules, a relative Markdown link becomes its text;
//   absolute links stay.
import { Comment, Converter, ReflectionKind } from "typedoc";

/** A Markdown link whose target isn't absolute (http(s):, mailto:, /path or #anchor). */
const RELATIVE_LINK = /\[([^\]]*)\]\((?!(?:https?:|mailto:|\/|#))[^)]*\)/g;

/**
 * `parts` (a comment's display parts) with relative Markdown links replaced by their text.
 * TypeDoc splits `[label](../x.md)` into a text part ending `[label](`, a `relative-link` part
 * (the target) and a text part starting `)`; a link it didn't split stays in one text part.
 */
function unlinkParts(parts) {
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (part.kind === "relative-link") {
      const before = parts[i - 1];
      const after = parts[i + 1];
      const open = before?.kind === "text" ? /\[([^\]]*)\]\($/.exec(before.text) : null;
      if (open && after?.kind === "text" && after.text.startsWith(")")) {
        before.text = before.text.slice(0, open.index) + open[1];
        after.text = after.text.slice(1);
        parts.splice(i, 1);
        i--;
      }
    } else if (part.kind === "text") {
      part.text = part.text.replace(RELATIVE_LINK, "$1");
    }
  }
}

/** `comment` with relative Markdown links replaced by their text. */
function unlinkRelative(comment) {
  if (!comment) return;
  unlinkParts(comment.summary);
  for (const tag of comment.blockTags) unlinkParts(tag.content);
}

const PATH = /^(dataverse-sdk-[\w-]+)\/(?:dist|src)(?:\/(\w+))?$/;
const EXPLORER = "https://dataverse-sdk.mohsinonxrm.com";

/** A file of a generated package that holds generated operations or $metadata types. */
const GENERATED_FILE =
  /\/src\/(?:[^/]+(?:Action|Function|Message)\.ts|types\/(?!EntityPayload\.ts)[^/]+\.ts)$/;

const GENERATED = {
  "dataverse-sdk-actions": { classes: "action classes", list: "actions" },
  "dataverse-sdk-functions": { classes: "function classes", list: "functions" },
  "dataverse-sdk-messages": { classes: "request and response classes", list: "messages" },
};

export function load(app) {
  app.converter.on(Converter.EVENT_RESOLVE_END, (context) => {
    for (const reflection of Object.values(context.project.reflections)) {
      const file = reflection.sources?.[0]?.fullFileName?.replace(/\\/g, "/") ?? "";
      if (!file.includes("/node_modules/")) continue;
      unlinkRelative(reflection.comment);
      for (const signature of reflection.signatures ?? []) unlinkRelative(signature.comment);
    }
  });

  app.converter.on(Converter.EVENT_RESOLVE_BEGIN, (context) => {
    const project = context.project;
    for (const mod of project.getChildrenByKind(ReflectionKind.Module)) {
      const match = PATH.exec(mod.name);
      if (!match) throw new Error(`typedoc: unexpected module name "${mod.name}"`);
      const [, pkg, subpath] = match;
      mod.name = `@mohsinonxrm/${pkg}${subpath ? `/${subpath}` : ""}`;

      const generated = GENERATED[pkg];
      if (!generated) continue;
      let classes = 0;
      let types = 0;
      for (const child of [...(mod.children ?? [])]) {
        const file = child.sources?.[0]?.fullFileName?.replace(/\\/g, "/") ?? "";
        if (!GENERATED_FILE.test(file)) continue;
        if (child.kindOf(ReflectionKind.Class)) classes++;
        else types++;
        project.removeReflection(child);
      }
      if (!classes) throw new Error(`typedoc: no generated classes found in ${mod.name}`);
      const note =
        `The ${classes.toLocaleString("en-US")} generated ${generated.classes} and their ` +
        `${types.toLocaleString("en-US")} parameter, response and $metadata types aren't listed ` +
        `here: see the [list of ${generated.list}](/guide/mapping/supported-${generated.list}) ` +
        `and the package's ` +
        `[README](/packages/${pkg.replace("dataverse-sdk-", "")}), or try them in the ` +
        `[explorer](${EXPLORER}). Each class has TSDoc, shown by your editor.`;
      const summary = [{ kind: "text", text: note }];
      mod.comment = mod.comment
        ? new Comment([...mod.comment.summary, { kind: "text", text: "\n\n" }, ...summary])
        : new Comment(summary);
    }
  });
}
