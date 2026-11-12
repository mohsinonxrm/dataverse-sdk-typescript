/**
 * Live check of the metadata package's `RelationshipBehavior` values (#482). Microsoft documents
 * `OneToManyRelationshipMetadata.RelationshipBehavior` only as an `int`, so the names
 * (0 Referential, 1 Parental, 2 Custom) are checked against the relationships' cascade settings:
 * most parental relationships cascade every action, and most referential ones cascade none of
 * assign, share, unshare and reparent. Not every one: a system relationship can be parental and
 * still not cascade assign (`account_principalobjectattributeaccess`, seen in the dev org), so
 * the exceptions are logged and a swapped mapping fails (it would make nearly every one an
 * exception). See ./env.ts for configuration. This test only reads.
 */
import { describe, expect, it } from "vitest";
import { RelationshipBehavior } from "@mohsinonxrm/dataverse-sdk-metadata";
import { live, liveClient } from "./env.js";

interface Relationship {
  SchemaName: string;
  RelationshipBehavior?: number | null;
  CascadeConfiguration?: Record<string, string | null> | null;
}

const OWNERSHIP_ACTIONS = ["Assign", "Share", "Unshare", "Reparent"] as const;

const cascadesEverything = (r: Relationship): boolean =>
  [...OWNERSHIP_ACTIONS, "Delete"].every(
    (action) => r.CascadeConfiguration?.[action] === "Cascade"
  );
const cascadesNoOwnershipAction = (r: Relationship): boolean =>
  OWNERSHIP_ACTIONS.every((action) => r.CascadeConfiguration?.[action] === "NoCascade");

describe.skipIf(!live)("live: metadata RelationshipBehavior values (#482)", () => {
  it("parental relationships mostly cascade everything; referential ones no ownership action", async () => {
    const { client } = liveClient();
    const relationships = await client
      .api("/RelationshipDefinitions/Microsoft.Dynamics.CRM.OneToManyRelationshipMetadata")
      .select("SchemaName", "RelationshipBehavior", "CascadeConfiguration")
      .filter("ReferencedEntity eq 'account' or ReferencedEntity eq 'contact'")
      .getAll<Relationship>();

    const parental = relationships.filter(
      (r) => r.RelationshipBehavior === RelationshipBehavior.Parental
    );
    const referential = relationships.filter(
      (r) => r.RelationshipBehavior === RelationshipBehavior.Referential
    );
    // Both kinds exist among account's and contact's standard relationships.
    expect(parental.length).toBeGreaterThan(0);
    expect(referential.length).toBeGreaterThan(0);

    const oddParental = parental.filter((r) => !cascadesEverything(r)).map((r) => r.SchemaName);
    const oddReferential = referential
      .filter((r) => !cascadesNoOwnershipAction(r))
      .map((r) => r.SchemaName);
    console.log(
      `[#482] ${String(parental.length)} parental, ${String(referential.length)} referential; ` +
        `parental that don't cascade everything: ${JSON.stringify(oddParental)}; ` +
        `referential that cascade an ownership action: ${JSON.stringify(oddReferential)}`
    );
    expect(oddParental.length, `parental exceptions: ${oddParental.join(", ")}`).toBeLessThan(
      parental.length / 2
    );
    expect(
      oddReferential.length,
      `referential exceptions: ${oddReferential.join(", ")}`
    ).toBeLessThan(referential.length / 2);

    // Every value seen is one of the three named ones.
    const known: number[] = Object.values(RelationshipBehavior);
    for (const r of relationships) {
      if (r.RelationshipBehavior != null) expect(known).toContain(r.RelationshipBehavior);
    }
  });
});
