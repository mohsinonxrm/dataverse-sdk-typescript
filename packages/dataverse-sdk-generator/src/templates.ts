/**
 * The EJS templates the generator renders, and custom templates (#347): a directory set as
 * `templates` in the configuration overrides the built-in template of the same name;
 * `ejectTemplates()` (`dataverse-gen eject`) copies the built-in ones there to start from.
 */
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

/** The built-in templates: next to `src/` and `dist/`, in the package's `templates/` folder. */
const BUILT_IN_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "templates");

/** The name of every template the generator renders. */
export const TEMPLATE_NAMES = [
  "action.ejs",
  "client.ejs",
  "complextype.ejs",
  "entity.ejs",
  "enum.ejs",
  "form.ejs",
  "function.ejs",
  "metadata.ejs",
] as const;

/** The name of a template the generator renders, e.g. `"entity.ejs"`. */
export type TemplateName = (typeof TEMPLATE_NAMES)[number];

/**
 * A template's text: `<templatesDir>/<name>` when `templatesDir` is given and has it, else the
 * built-in one.
 */
export async function loadTemplate(name: TemplateName, templatesDir?: string): Promise<string> {
  if (templatesDir) {
    try {
      return await fs.readFile(path.resolve(templatesDir, name), "utf-8");
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    }
  }
  return await fs.readFile(path.join(BUILT_IN_DIR, name), "utf-8");
}

/** Options for {@link ejectTemplates}. */
export interface EjectTemplatesOptions {
  /** Overwrite templates that are already in the directory (default: `false`, they're kept). */
  force?: boolean;
}

/**
 * Copy the built-in templates into `dir` (created if needed), to customize them and point the
 * configuration's `templates` at `dir`. A template already there is kept unless `force` is set.
 * Returns the paths written and the ones kept.
 */
export async function ejectTemplates(
  dir: string,
  options: EjectTemplatesOptions = {}
): Promise<{ written: string[]; skipped: string[] }> {
  await fs.mkdir(dir, { recursive: true });
  const written: string[] = [];
  const skipped: string[] = [];
  for (const name of TEMPLATE_NAMES) {
    const target = path.join(dir, name);
    try {
      await fs.copyFile(
        path.join(BUILT_IN_DIR, name),
        target,
        options.force === true ? 0 : fs.constants.COPYFILE_EXCL
      );
      written.push(target);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;
      skipped.push(target);
    }
  }
  return { written, skipped };
}
