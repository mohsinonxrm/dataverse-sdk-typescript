/**
 * #295: the SDK's one `EntityReference`, read from the entity tables generated from the
 * `$metadata` snapshot (`src/generated/entity-tables.ts`).
 */
import { describe, expect, it } from "vitest";
import { DataverseInvalidRequestError } from "@mohsinonxrm/dataverse-sdk-core";
import { createEntityReference, getEntitySetNameFromReference } from "../src/index.js";

describe("createEntityReference (#72, #295)", () => {
  it("is the Web API shape, keyed by the snapshot's primary key", () => {
    expect(JSON.stringify(createEntityReference("account", "a1"))).toBe(
      '{"@odata.type":"Microsoft.Dynamics.CRM.account","accountid":"a1"}'
    );
    // An activity inherits activitypointer's key
    expect(JSON.stringify(createEntityReference("email", "e1"))).toBe(
      '{"@odata.type":"Microsoft.Dynamics.CRM.email","activityid":"e1"}'
    );
    expect(Object.keys(createEntityReference("account", "a1"))).toEqual([
      "@odata.type",
      "accountid",
    ]);
  });

  it("carries logicalName, id and the snapshot's entity set, not enumerable", () => {
    const opportunity = createEntityReference("opportunity", "o1");
    expect(opportunity).toMatchObject({ logicalName: "opportunity", id: "o1" });
    expect(opportunity.entitySetName).toBe("opportunities");
    expect(getEntitySetNameFromReference(opportunity)).toBe("opportunities");
    expect(createEntityReference("EntityMetadata", "m1").entitySetName).toBe("EntityDefinitions");
  });

  it("uses <name>id and no entity set for a table the snapshot doesn't know", () => {
    const widget = createEntityReference("new_widget", "w1");
    expect(JSON.stringify(widget)).toBe(
      '{"@odata.type":"Microsoft.Dynamics.CRM.new_widget","new_widgetid":"w1"}'
    );
    expect(widget.entitySetName).toBeUndefined();
    expect(() => getEntitySetNameFromReference(widget)).toThrow(DataverseInvalidRequestError);
    expect(() => getEntitySetNameFromReference(widget)).toThrow(/entity set of 'new_widget'/);
  });

  it("takes the primary key, entity set and display name as options", () => {
    const widget = createEntityReference("new_widget", "w1", {
      primaryIdAttribute: "new_widgetkey",
      entitySetName: "new_widgetset",
      name: "Widget",
    });
    expect(JSON.stringify(widget)).toBe(
      '{"@odata.type":"Microsoft.Dynamics.CRM.new_widget","new_widgetkey":"w1"}'
    );
    expect(getEntitySetNameFromReference(widget)).toBe("new_widgetset");
    expect(widget.name).toBe("Widget");
  });

  it("doesn't read inherited object properties as a table", () => {
    expect(JSON.stringify(createEntityReference("constructor", "c1"))).toBe(
      '{"@odata.type":"Microsoft.Dynamics.CRM.constructor","constructorid":"c1"}'
    );
    expect(createEntityReference("toString", "t1").entitySetName).toBeUndefined();
  });
});
