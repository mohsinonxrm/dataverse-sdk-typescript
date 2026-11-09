/**
 * #49 live: `prefer()…done()` keeps the chain, and `expand()` options objects produce an `$expand`
 * Dataverse accepts. Read-only: nothing is created.
 */
import { describe, expect, it } from "vitest";
import { live, liveClient } from "./env.js";

describe.skipIf(!live)("live: builder ergonomics (#49)", () => {
  it("prefer().maxPageSize(1).done().get() returns one row and a nextLink", async () => {
    const page = await liveClient()
      .client.api("systemusers")
      .select("fullname")
      .prefer()
      .maxPageSize(1)
      .allAnnotations()
      .done()
      .get<{ value: unknown[]; "@odata.nextLink"?: string }>();
    expect(page.value).toHaveLength(1);
    expect(page["@odata.nextLink"]).toBeDefined();
  });

  it("expand() with options on single- and collection-valued navigation properties", async () => {
    const res = await liveClient()
      .client.api("businessunits")
      .select("name")
      .top(1)
      .expand("createdby", { select: ["fullname"] }, "business_unit_system_users", {
        select: ["fullname"],
        orderBy: "fullname",
        top: 2,
      })
      .get<{ value: Array<{ createdby?: object; business_unit_system_users: unknown[] }> }>();
    expect(res.value).toHaveLength(1);
    expect(Array.isArray(res.value[0]?.business_unit_system_users)).toBe(true);
    expect(res.value[0]?.business_unit_system_users.length).toBeLessThanOrEqual(2);
  });
});
