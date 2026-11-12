/**
 * Live check of the metadata package's `RelationshipBehavior` values (#482). Microsoft documents
 * `OneToManyRelationshipMetadata.RelationshipBehavior` only as an `int`, so the names
 * (0 Referential, 1 Parental, 2 Custom) are checked against each relationship's cascade settings:
 * a parental relationship cascades every action, a referential one cascades none of assign,
 * share, unshare and reparent. See ./env.ts for configuration. This test only reads.
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

describe.skipIf(!live)("live: metadata RelationshipBehavior values (#482)", () => {
  it("parental relationships cascade everything; referential ones cascade no ownership action", async () => {
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

    for (const r of parental) {
      for (const action of [...OWNERSHIP_ACTIONS, "Delete"]) {
        expect(`${r.SchemaName} ${action}=${String(r.CascadeConfiguration?.[action])}`).toBe(
          `${r.SchemaName} ${action}=Cascade`
        );
      }
    }
    for (const r of referential) {
      for (const action of OWNERSHIP_ACTIONS) {
        expect(`${r.SchemaName} ${action}=${String(r.CascadeConfiguration?.[action])}`).toBe(
          `${r.SchemaName} ${action}=NoCascade`
        );
      }
    }
    // Every value seen is one of the three named ones.
    const known: number[] = Object.values(RelationshipBehavior);
    for (const r of relationships) {
      if (r.RelationshipBehavior != null) expect(known).toContain(r.RelationshipBehavior);
    }
  });
});
