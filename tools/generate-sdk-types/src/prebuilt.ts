/**
 * Which operations the prebuilt packages hold (#304): the platform, Sales and Customer Service.
 *
 * `metadata/operation-solutions.json` (written by `snapshot`, see `src/solutions.ts`) gives each
 * operation's Microsoft-managed solutions, and `metadata/prebuilt-solutions.json` classifies every
 * solution in it: the app it belongs to, and whether its operations are prebuilt. An operation is
 * prebuilt when it has no solution (it is built into the Web API, such as `LastXDays`) or when one
 * of its solutions is prebuilt. So `WinOpportunity` (in `System` and a Sales patch) is prebuilt and
 * `CCaaS_GetAgents` (only in `msdyn_OmnichannelCCaaSAPI`) is not. Everything else is left to
 * `dataverse-gen`.
 *
 * The complex, entity and enum types of the packages' `types/` follow: only the types the kept
 * operations can reach are generated. The metadata package's types and entities-runtime's entity
 * tables don't depend on operations and still come from the whole snapshot.
 */
import type { CsdlSchema } from "./parsers/csdl-types.js";
import type { OperationSolutions } from "./solutions.js";
import { SYSTEM_ENTITIES } from "./utils/polymorphism.js";

/** How `prebuilt-solutions.json` classifies one solution. */
export interface SolutionClass {
  /** What the solution belongs to: `Platform`, `Sales`, `Customer Service`, `Contact Center`, … */
  app: string;
  /** Its operations are in the prebuilt packages. */
  prebuilt: boolean;
  /** Why a borderline solution is classified the way it is. */
  note?: string;
}

/** `metadata/prebuilt-solutions.json`. */
export interface PrebuiltSolutions {
  solutions: Record<string, SolutionClass>;
}

/** What {@link selectPrebuilt} filters by. */
export interface PrebuiltFilter {
  operationSolutions: OperationSolutions;
  prebuilt: PrebuiltSolutions;
  /**
   * Operations that aren't in the snapshot and so have no recorded solutions, but are platform:
   * the supplemental operations Dataverse leaves out of `$metadata` (`ExportToExcel`).
   */
  platform?: readonly string[];
}

/** An operation with these solutions is prebuilt: it has none, or one of them is prebuilt. */
export function isPrebuilt(solutions: readonly string[], prebuilt: PrebuiltSolutions): boolean {
  // An unclassified solution counts as not prebuilt (checkPrebuiltFilter refuses it anyway)
  const classOf = (s: string): SolutionClass | undefined => prebuilt.solutions[s];
  return solutions.length === 0 || solutions.some((s) => classOf(s)?.prebuilt ?? false);
}

/**
 * Check that `filter` covers `operations` (every operation name in the CSDL): each has recorded
 * solutions (or is a {@link PrebuiltFilter.platform} operation), each recorded solution is
 * classified, and each classified solution is still named by an operation. Throws otherwise, so a
 * new snapshot can't add an app's operations without someone deciding about them.
 */
export function checkPrebuiltFilter(filter: PrebuiltFilter, operations: Iterable<string>): void {
  const platform = new Set(filter.platform ?? []);
  const missing = [...new Set(operations)]
    .filter((op) => !(op in filter.operationSolutions) && !platform.has(op))
    .sort();
  if (missing.length > 0) {
    throw new Error(
      `prebuilt: no solutions recorded for ${missing.join(", ")}. ` +
        "Take the snapshot again (`pnpm --filter generate-sdk-types snapshot`)."
    );
  }
  const named = new Set(Object.values(filter.operationSolutions).flat());
  const unclassified = [...named].filter((s) => !(s in filter.prebuilt.solutions)).sort();
  if (unclassified.length > 0) {
    throw new Error(
      `prebuilt: classify ${unclassified.join(", ")} in metadata/prebuilt-solutions.json`
    );
  }
  const unused = Object.keys(filter.prebuilt.solutions)
    .filter((s) => !named.has(s))
    .sort();
  if (unused.length > 0) {
    throw new Error(
      `prebuilt: no operation is in ${unused.join(", ")}; remove it from metadata/prebuilt-solutions.json`
    );
  }
}

const CRM = "Microsoft.Dynamics.CRM";

/** `Collection(mscrm.X)` / `Microsoft.Dynamics.CRM.X` -> `X`; `Edm.*` and other namespaces -> undefined. */
function crmName(type: string | undefined): string | undefined {
  if (!type) return undefined;
  const inner = type.replace(/^Collection\((.*)\)$/, "$1");
  if (inner.startsWith("mscrm.")) return inner.slice("mscrm.".length);
  if (inner.startsWith(`${CRM}.`)) return inner.slice(CRM.length + 1);
  return undefined;
}

/**
 * The CRM complex, entity and enum types that the generated code for `operations` can name: their
 * parameter and return types and, from there, base types, property types, the navigation
 * properties of complex types (#231), and every type derived from a generated type (its
 * `Typed<Base>` union lists them, #73). Entity types' navigation properties aren't followed: the
 * generated entity interfaces have none. `ComplexEntityMetadata` and the other `Complex*` types
 * also reach the type without the prefix, which the generators use instead.
 */
export function reachableTypes(
  csdl: CsdlSchema,
  operations: ReadonlyArray<CsdlSchema["actions"][number]>
): Set<string> {
  const complex = new Map(
    csdl.complexTypes.filter((t) => t.namespace === CRM).map((t) => [t.name, t] as const)
  );
  const entities = new Map(
    csdl.entityTypes.filter((t) => t.namespace === CRM).map((t) => [t.name, t] as const)
  );
  const enums = new Set(csdl.enumTypes.filter((t) => t.namespace === CRM).map((t) => t.name));
  const derived = new Map<string, string[]>();
  for (const t of [...complex.values(), ...entities.values()]) {
    const base = crmName(t.baseType);
    if (base) derived.set(base, [...(derived.get(base) ?? []), t.name]);
  }

  const seen = new Set<string>();
  const pending: string[] = [];
  const reach = (type: string | undefined): void => {
    const name = crmName(type) ?? type;
    if (!name || seen.has(name)) return;
    if (!complex.has(name) && !entities.has(name) && !enums.has(name)) return;
    seen.add(name);
    pending.push(name);
  };
  for (const op of operations) {
    reach(op.bindingParameter?.type);
    for (const p of op.parameters) reach(p.type);
    reach(op.returnType);
  }
  for (let name = pending.pop(); name !== undefined; name = pending.pop()) {
    if (name.startsWith("Complex")) reach(name.slice("Complex".length));
    const ct = complex.get(name);
    const et = ct ? undefined : entities.get(name);
    const t = ct ?? et;
    if (!t) continue;
    reach(t.baseType);
    for (const p of t.properties) reach(p.type);
    if (ct) for (const n of ct.navigationProperties) reach(n.type);
    // crmbaseentity, principal, …: not generated, so no Typed union lists their derived types
    if (!SYSTEM_ENTITIES.includes(name.toLowerCase())) {
      for (const d of derived.get(name) ?? []) reach(d);
    }
  }
  return seen;
}

/** The result of {@link selectPrebuilt}. */
export interface PrebuiltSelection {
  /** The CSDL with only the prebuilt operations and the types they reach. */
  csdl: CsdlSchema;
  /** Names of the kept and the left-out operations, sorted (an overloaded name once). */
  included: string[];
  excluded: string[];
}

/**
 * `csdl` with only the prebuilt operations, and only the CRM types they reach (types of other
 * namespaces and the abstract system entities are kept as they are). Entity sets are unchanged.
 */
export function selectPrebuilt(csdl: CsdlSchema, filter: PrebuiltFilter): PrebuiltSelection {
  const names = [...csdl.actions, ...csdl.functions].map((op) => op.name);
  checkPrebuiltFilter(filter, names);
  const keep = (op: { name: string }): boolean =>
    isPrebuilt(filter.operationSolutions[op.name] ?? [], filter.prebuilt);
  const actions = csdl.actions.filter(keep);
  const functions = csdl.functions.filter(keep);
  const types = reachableTypes(csdl, [...actions, ...functions]);
  const typeKept = (t: { name: string; namespace: string }): boolean =>
    t.namespace !== CRM || types.has(t.name);
  const included = new Set([...actions, ...functions].map((op) => op.name));
  const sorted = (list: Iterable<string>): string[] =>
    [...new Set(list)].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
  return {
    csdl: {
      ...csdl,
      actions,
      functions,
      complexTypes: csdl.complexTypes.filter(typeKept),
      entityTypes: csdl.entityTypes.filter(
        (t) => typeKept(t) || SYSTEM_ENTITIES.includes(t.name.toLowerCase())
      ),
      enumTypes: csdl.enumTypes.filter(typeKept),
    },
    included: sorted(included),
    excluded: sorted(names.filter((n) => !included.has(n))),
  };
}

const escapeCell = (text: string): string => text.replace(/\|/g, "\\|");

/**
 * The markdown table of every solution in `filter`: its app, how many operations it has and
 * whether they're prebuilt, with the operations that have no solution first. Prebuilt solutions
 * come first, then by app and name.
 */
export function renderSolutionTable(filter: PrebuiltFilter): string {
  const counts = new Map<string, number>();
  let none = 0;
  for (const solutions of Object.values(filter.operationSolutions)) {
    if (solutions.length === 0) none++;
    for (const s of solutions) counts.set(s, (counts.get(s) ?? 0) + 1);
  }
  const rows = Object.entries(filter.prebuilt.solutions).sort(
    ([a, x], [b, y]) =>
      Number(y.prebuilt) - Number(x.prebuilt) ||
      (x.app < y.app ? -1 : x.app > y.app ? 1 : 0) ||
      (a.toLowerCase() < b.toLowerCase() ? -1 : a.toLowerCase() > b.toLowerCase() ? 1 : 0)
  );
  const lines = [
    "| Solution | App | Operations | Prebuilt | Note |",
    "| --- | --- | --: | --- | --- |",
    `| _(none: built into the Web API)_ | Platform | ${String(none)} | yes | |`,
    ...rows.map(
      ([name, c]) =>
        `| \`${name}\` | ${escapeCell(c.app)} | ${String(counts.get(name) ?? 0)} | ${c.prebuilt ? "yes" : "no"} |${c.note ? ` ${escapeCell(c.note)} ` : " "}|`
    ),
  ];
  return lines.join("\n");
}

const SOLUTIONS_BLOCK = /<!-- solutions -->[\s\S]*?<!-- \/solutions -->/g;

/** `markdown` with its `<!-- solutions -->` block regenerated by {@link renderSolutionTable}. */
export function renderSolutionBlocks(markdown: string, filter: PrebuiltFilter): string {
  return markdown.replace(
    SOLUTIONS_BLOCK,
    () => `<!-- solutions -->\n\n${renderSolutionTable(filter)}\n\n<!-- /solutions -->`
  );
}
