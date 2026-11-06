/**
 * Operation overloads (#75). CSDL can declare one operation name several times with different
 * bindings (`RetrieveUnpublished` is bound to a dozen tables, `RetrievePrincipalAccess` to
 * `systemuser`, `team` and `organization`). The generators wrote one file per name, so each
 * overload overwrote the one before and only the last binding survived.
 *
 * Each overload now gets its own class, named like the entities generator's (#202):
 * `<Name>_<binding table>`, plus `_collection` for a collection binding
 * (`RetrieveUnpublished_savedqueryFunction`). The unbound overload keeps the plain name. A name
 * that has no unbound overload keeps its plain-name export as a deprecated alias of the overload
 * it used to export, so existing imports still compile and behave the same.
 */
import type { CsdlAction, CsdlFunction } from "../parsers/csdl-types.js";

type Operation = CsdlAction | CsdlFunction;

/** A plain-name export kept for an overloaded name with no unbound overload. */
export interface DeprecatedOverloadAlias {
  /** The plain operation name, e.g. `RetrievePrincipalAccess`. */
  name: string;
  /** The stem of the overload the plain name used to export (the last one in the CSDL). */
  target: string;
  /** Its binding, for the doc comment. */
  binding: string;
}

export interface OperationNames<T extends Operation> {
  /** Class-name stem per operation: `name`, or `name_binding` for a bound overload. */
  stems: Map<T, string>;
  aliases: DeprecatedOverloadAlias[];
}

/** The binding table of a bound operation, without namespace, plus whether it's a collection. */
function binding(op: Operation): { table: string; collection: boolean } | undefined {
  const type = op.isBound ? op.bindingParameter?.type : undefined;
  if (!type) return undefined;
  const collection = type.startsWith("Collection(");
  const inner = collection ? type.slice(11, -1) : type;
  return { table: inner.replace(/^Microsoft\.Dynamics\.CRM\.|^mscrm\./, ""), collection };
}

/**
 * Unique class-name stems for `operations`, in order. A collision that suffixing can't resolve
 * (two definitions with the same name and binding) gets `_2`, `_3`, … and a warning, so nothing is
 * overwritten silently.
 */
export function operationNames<T extends Operation>(
  operations: readonly T[],
  warn: (message: string) => void = (m) => {
    console.warn(m);
  }
): OperationNames<T> {
  const byName = new Map<string, T[]>();
  for (const op of operations) byName.set(op.name, [...(byName.get(op.name) ?? []), op]);

  const stems = new Map<T, string>();
  const used = new Set<string>();
  for (const op of operations) {
    const b = binding(op);
    let stem = op.name;
    if ((byName.get(op.name)?.length ?? 0) > 1 && b) {
      stem = `${op.name}_${b.table}${b.collection ? "_collection" : ""}`;
    }
    const base = stem;
    for (let i = 2; used.has(stem); i++) stem = `${base}_${String(i)}`;
    if (stem !== base)
      warn(`  ⚠️  ${op.name}: two definitions named ${base}; the second is ${stem}`);
    used.add(stem);
    stems.set(op, stem);
  }

  const aliases: DeprecatedOverloadAlias[] = [];
  for (const [name, ops] of byName) {
    if (ops.length < 2 || ops.some((op) => !op.isBound)) continue;
    const last = ops[ops.length - 1];
    const b = binding(last);
    const target = stems.get(last);
    if (!b || !target || used.has(name)) continue;
    aliases.push({ name, target, binding: `${b.collection ? "a collection of " : ""}${b.table}` });
  }
  return { stems, aliases };
}

/**
 * Source of the plain-name file for a deprecated alias: `<Name><suffix>.ts` re-exporting the
 * overload it used to be, as a value and as types.
 *
 * @param fileSuffix - The generated files' suffix, e.g. `Action` or `Message`.
 * @param classSuffixes - The exported names' suffixes, e.g. `["Action", "Response"]`.
 * @param valueSuffixes - Which of them are classes (values as well as types).
 */
export function deprecatedAliasSource(
  alias: DeprecatedOverloadAlias,
  fileSuffix: string,
  classSuffixes: readonly string[],
  valueSuffixes: readonly string[]
): string {
  const imports = classSuffixes
    .map((s) => (valueSuffixes.includes(s) ? `${alias.target}${s}` : `type ${alias.target}${s}`))
    .join(", ");
  let code = `import { ${imports} } from './${alias.target}${fileSuffix}.js';\n\n`;
  for (const s of classSuffixes) {
    const doc =
      `/**\n` +
      ` * @deprecated Use \`${alias.target}${s}\`. \`${alias.name}\` has a class per binding (#75);\n` +
      ` * this name kept the one bound to ${alias.binding}.\n` +
      ` */\n`;
    if (valueSuffixes.includes(s)) {
      code += doc + `export const ${alias.name}${s} = ${alias.target}${s};\n`;
    }
    code += doc + `export type ${alias.name}${s} = ${alias.target}${s};\n`;
  }
  return code;
}
