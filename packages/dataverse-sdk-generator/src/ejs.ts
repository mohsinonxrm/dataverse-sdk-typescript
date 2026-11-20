/**
 * EJS, as a module object with `render` and the rest, whichever build Node loads.
 *
 * ejs 3 is CommonJS: Node's ES-module namespace for it has `default` (its `module.exports`) and
 * the names it can detect. ejs 4+ adds an ES-module build, and from 7 it has only a default
 * export, so `import * as ejs from "ejs"` gives `{ default }` and `ejs.render` is undefined under
 * Node (Vitest hides this by bridging defaults). `@types/ejs` declares named exports only, so a
 * default import doesn't type-check with `esModuleInterop` off: take `default` when it's there.
 */
import * as ejsNamespace from "ejs";

type Ejs = typeof ejsNamespace;

export const ejs: Ejs = (ejsNamespace as Ejs & { default?: Ejs }).default ?? ejsNamespace;
