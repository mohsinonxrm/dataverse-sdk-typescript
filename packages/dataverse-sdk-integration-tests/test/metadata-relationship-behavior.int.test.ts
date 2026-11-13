/**
 * Live check of the metadata package's `RelationshipBehavior` values (#482, #537). Microsoft
 * documents `OneToManyRelationshipMetadata.RelationshipBehavior` only as an `int`, and the dev org
 * showed that the name `Parental` for 1 doesn't fit: of account's and contact's relationships with
 * 1, most don't cascade every action. Until the names are settled from data, this test logs how
 * the values are distributed over the org's one-to-many relationships (count, custom ones, and the
 * most common cascade settings of each value, with examples), and checks only what the data has
 * shown: every value is 0, 1 or 2, and most relationships with 0 cascade no ownership action
 * (assign, share, unshare, reparent). See ./env.ts for configuration. This test only reads.
 */
import { describe, expect, it } from "vitest";
import { RelationshipBehavior } from "@mohsinonxrm/dataverse-sdk-metadata";
import { live, liveClient } from "./env.js";

interface Relationship {
  SchemaName: string;
  RelationshipBehavior?: number | null;
  IsCustomRelationship?: boolean | null;
  CascadeConfiguration?: Record<string, string | null> | null;
}

const OWNERSHIP_ACTIONS = ["Assign", "Share", "Unshare", "Reparent"] as const;
const ACTIONS = [...OWNERSHIP_ACTIONS, "Delete", "Merge", "RollupView", "Archive"] as const;

/** The cascade settings as one short string: `Assign=Cascade Share=NoCascade ...`. */
const cascadeOf = (r: Relationship): string =>
  ACTIONS.map((action) => `${action}=${r.CascadeConfiguration?.[action] ?? "-"}`).join(" ");

const cascadesNoOwnershipAction = (r: Relationship): boolean =>
  OWNERSHIP_ACTIONS.every((action) => r.CascadeConfiguration?.[action] === "NoCascade");

describe.skipIf(!live)("live: metadata RelationshipBehavior values (#482)", () => {
  it("logs how the values are distributed; 0 is referential", async () => {
    const { client } = liveClient();
    const relationships = await client
      .api("/RelationshipDefinitions/Microsoft.Dynamics.CRM.OneToManyRelationshipMetadata")
      .select("SchemaName", "RelationshipBehavior", "IsCustomRelationship", "CascadeConfiguration")
      .getAll<Relationship>();

    // Per value: how many, how many custom, and the most common cascade settings with examples
    const byValue = new Map<string, Relationship[]>();
    for (const r of relationships) {
      const key = String(r.RelationshipBehavior ?? "null");
      byValue.set(key, [...(byValue.get(key) ?? []), r]);
    }
    const distribution = Object.fromEntries(
      [...byValue].map(([value, list]) => {
        const settings = new Map<string, string[]>();
        for (const r of list) {
          const key = cascadeOf(r);
          settings.set(key, [...(settings.get(key) ?? []), r.SchemaName]);
        }
        return [
          value,
          {
            count: list.length,
            custom: list.filter((r) => r.IsCustomRelationship === true).length,
            cascade: [...settings]
              .sort((a, b) => b[1].length - a[1].length)
              .slice(0, 8)
              .map(([cascade, names]) => ({
                cascade,
                count: names.length,
                examples: names.slice(0, 3),
              })),
          },
        ];
      })
    );
    console.log(`[#482 distribution] ${JSON.stringify(distribution)}`);

    // Every value is one of the three the constant has.
    const known: number[] = Object.values(RelationshipBehavior);
    const unknown = relationships.filter(
      (r) => r.RelationshipBehavior != null && !known.includes(r.RelationshipBehavior)
    );
    expect(unknown.map((r) => `${r.SchemaName}=${String(r.RelationshipBehavior)}`)).toEqual([]);

    // 0 is referential: most cascade no ownership action.
    const referential = relationships.filter(
      (r) => r.RelationshipBehavior === RelationshipBehavior.Referential
    );
    expect(referential.length).toBeGreaterThan(0);
    const odd = referential.filter((r) => !cascadesNoOwnershipAction(r));
    expect(odd.length, odd.map((r) => r.SchemaName).join(", ")).toBeLessThan(
      referential.length / 2
    );
  });
});
