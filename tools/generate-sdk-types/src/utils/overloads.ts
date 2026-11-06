/**
 * Operation overloads (#75). CSDL can declare one operation name several times with different
 * bindings (`RetrieveUnpublished` is bound to a dozen tables, `RetrievePrincipalAccess` to
 * `systemuser`, `team` and `organization`). The generators wrote one file per name, so each
 * overload overwrote the one before and only the last binding survived.
 *
 * Each overload now gets its own class, named like the entities generator's (#202):
 * `<Name>_<binding table>`, plus `_collection` for a collection binding
 * (`RetrieveUnpublished_savedqueryFunction`). The unbound overload keeps the plain name.
 *
 * A name with no unbound overload has no plain-name export (#286): `RetrievePrincipalAccessFunction`
 * would read as one class for every binding when it could only ever be one of them, so the caller
 * picks the binding (`RetrievePrincipalAccess_teamFunction`).
 */
import type { CsdlAction, CsdlFunction } from "../parsers/csdl-types.js";

type Operation = CsdlAction | CsdlFunction;

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
): Map<T, string> {
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

  return stems;
}
