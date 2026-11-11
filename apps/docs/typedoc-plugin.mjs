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
import { Comment, Converter, ReflectionKind } from "typedoc";

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
