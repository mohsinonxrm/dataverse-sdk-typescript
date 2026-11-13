/**
 * Live survey of `OneToManyRelationshipMetadata.RelationshipBehavior` (#482, #537). Microsoft
 * documents the property only as an `int`, and the metadata package types it as a plain number.
 * The first survey (2026-11-12, 29,534 relationships in the dev org) found that each value goes
 * with one `SecurityTypes` (0 None, 1 Append, 2 ParentChild, 4 and 12 Pointer), with every type
 * of behavior under each value, so the names the package once gave them (0 Referential,
 * 1 Parental, 2 Custom) were dropped. To notice if that changes, this test reads every
 * one-to-many relationship (a many-to-one relationship is the same relationship seen from the
 * other table) and logs, for each value:
 *
 * - the type of behavior its cascade settings amount to, as the maker portal names them:
 *   Parental (assign, share, unshare, reparent and delete all cascade), Referential (none of
 *   them cascades, delete removes the link), Referential, restrict delete (none cascades, delete
 *   is restricted), or Custom (anything else);
 * - its `SecurityTypes` (flags: Append 1, ParentChild 2, Pointer 4, Inheritance 8);
 * - how many are custom, managed and hierarchical, with examples.
 *
 * Many-to-many relationships have neither `RelationshipBehavior` nor cascade settings; their
 * number is logged too. The test checks only that the org answers; the log is the result. See
 * ./env.ts for configuration. This test only reads.
 */
import { describe, expect, it } from "vitest";
import { live, liveClient } from "./env.js";

interface Relationship {
  SchemaName: string;
  ReferencedEntity?: string | null;
  ReferencingEntity?: string | null;
  RelationshipBehavior?: number | null;
  SecurityTypes?: string | null;
  IsCustomRelationship?: boolean | null;
  IsManaged?: boolean | null;
  IsHierarchical?: boolean | null;
  CascadeConfiguration?: Record<string, string | null> | null;
}

const KEY_ACTIONS = ["Assign", "Share", "Unshare", "Reparent"] as const;

/** A cascade setting that passes the action on: Cascade All, Cascade Active, Cascade User-owned. */
const CASCADING = new Set(["Cascade", "Active", "UserOwned"]);

/**
 * The maker portal's type of behavior the cascade settings amount to. The maker docs ("Create
 * and edit relationships between tables") call a relationship parental when assign, share,
 * unshare, reparent or delete cascades; the Parental preset cascades all of them.
 */
function typeOfBehavior(r: Relationship): string {
  const c = r.CascadeConfiguration ?? {};
  const keys = KEY_ACTIONS.map((action) => c[action] ?? "");
  if (keys.every((v) => v === "Cascade") && c.Delete === "Cascade") return "Parental";
  if (keys.every((v) => v === "NoCascade")) {
    if (c.Delete === "RemoveLink") return "Referential, remove link";
    if (c.Delete === "Restrict") return "Referential, restrict delete";
  }
  return keys.some((v) => CASCADING.has(v)) || c.Delete === "Cascade"
    ? "Custom, something cascades (parental)"
    : "Custom, nothing cascades";
}

/** Count `key` in `counts`. */
function add(counts: Record<string, number>, key: string): void {
  counts[key] = (counts[key] ?? 0) + 1;
}

describe.skipIf(!live)("live: metadata RelationshipBehavior values (#482)", () => {
  it("logs what each RelationshipBehavior value goes with", async () => {
    const { client } = liveClient();
    const oneToMany = await client
      .api("/RelationshipDefinitions/Microsoft.Dynamics.CRM.OneToManyRelationshipMetadata")
      .select(
        "SchemaName",
        "ReferencedEntity",
        "ReferencingEntity",
        "RelationshipBehavior",
        "SecurityTypes",
        "IsCustomRelationship",
        "IsManaged",
        "IsHierarchical",
        "CascadeConfiguration"
      )
      .getAll<Relationship>();
    const manyToMany = await client
      .api("/RelationshipDefinitions/Microsoft.Dynamics.CRM.ManyToManyRelationshipMetadata")
      .select("SchemaName", "IsCustomRelationship")
      .getAll<{ SchemaName: string; IsCustomRelationship?: boolean | null }>();
    expect(oneToMany.length).toBeGreaterThan(0);

    const byValue: Record<
      string,
      {
        count: number;
        custom: number;
        managed: number;
        hierarchical: number;
        typeOfBehavior: Record<string, number>;
        securityTypes: Record<string, number>;
        examples: Record<string, string[]>;
      }
    > = {};
    for (const r of oneToMany) {
      const value = String(r.RelationshipBehavior ?? "null");
      const entry = (byValue[value] ??= {
        count: 0,
        custom: 0,
        managed: 0,
        hierarchical: 0,
        typeOfBehavior: {},
        securityTypes: {},
        examples: {},
      });
      entry.count++;
      if (r.IsCustomRelationship === true) entry.custom++;
      if (r.IsManaged === true) entry.managed++;
      if (r.IsHierarchical === true) entry.hierarchical++;
      const type = typeOfBehavior(r);
      add(entry.typeOfBehavior, type);
      add(entry.securityTypes, r.SecurityTypes ?? "null");
      const examples = (entry.examples[type] ??= []);
      if (examples.length < 4) {
        examples.push(
          `${r.SchemaName} (${r.ReferencedEntity ?? "?"} 1:N ${r.ReferencingEntity ?? "?"}, ` +
            `${r.SecurityTypes ?? "?"}${r.IsCustomRelationship === true ? ", custom" : ""})`
        );
      }
    }
    console.log(`[#482 one-to-many] ${String(oneToMany.length)} relationships`);
    for (const [value, entry] of Object.entries(byValue)) {
      console.log(`[#482 value ${value}] ${JSON.stringify(entry)}`);
    }
    console.log(
      `[#482 many-to-many] ${String(manyToMany.length)} relationships, ` +
        `${String(manyToMany.filter((r) => r.IsCustomRelationship === true).length)} custom; ` +
        `no RelationshipBehavior or cascade settings`
    );
  });
});
