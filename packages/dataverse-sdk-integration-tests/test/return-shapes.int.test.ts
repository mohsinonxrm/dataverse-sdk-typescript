/**
 * Live tests for #300: `client.execute()` resolves the value an operation returns, not the OData
 * envelope. A collection is the array, a complex type is the body (with `@odata.context`), an
 * entity is the record (with its annotations), and a message's `result` is the same value as its
 * action's. Read-only: nothing is created.
 *
 * The only primitive returns in the CSDL (`Edm.Boolean`) are the $filter query functions such as
 * `Today` and `Above`; the Web API doesn't run one on its own (404), as the last test shows.
 * Operations with one primitive output are typed with a `<Name>Response` complex type instead.
 */
import { describe, expect, it } from "vitest";
import { CanBeReferencedAction } from "@mohsinonxrm/dataverse-sdk-actions";
import {
  GetAllTimeZonesWithDisplayNameFunction,
  GetPreferredSolutionFunction,
  GetTimeZoneCodeByLocalizedNameFunction,
  RetrievePrivilegeSetFunction,
  TodayFunction,
  WhoAmIFunction,
} from "@mohsinonxrm/dataverse-sdk-functions";
import { CanBeReferencedRequest } from "@mohsinonxrm/dataverse-sdk-messages";
import { live, liveClient } from "./env.js";

const GUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

describe.skipIf(!live)("live: return shapes (#300)", () => {
  it("a collection of any table is the array of records, with their annotations", async () => {
    const { client } = liveClient();
    const zones = await client.execute(
      new GetAllTimeZonesWithDisplayNameFunction({ LocaleId: 1033 })
    );
    expect(Array.isArray(zones)).toBe(true);
    expect(zones.length).toBeGreaterThan(0);
    expect(zones[0]?.timezonecode).toEqual(expect.any(Number));
    expect(zones[0]?.["@odata.etag"]).toEqual(expect.any(String));
  });

  it("a collection of a typed entity is the array of records", async () => {
    const { client } = liveClient();
    const privileges = await client.execute(new RetrievePrivilegeSetFunction());
    expect(Array.isArray(privileges)).toBe(true);
    expect(privileges[0]?.privilegeid).toMatch(GUID);
  });

  it("a complex type is the body, with @odata.context", async () => {
    const { client } = liveClient();
    const me = await client.execute(new WhoAmIFunction());
    expect(me.UserId).toMatch(GUID);
    expect(me["@odata.context"]).toContain("WhoAmIResponse");

    const tz = await client.execute(
      new GetTimeZoneCodeByLocalizedNameFunction({
        LocalizedStandardName: "Pacific Standard Time",
        LocaleId: 1033,
      })
    );
    expect(tz).not.toHaveProperty("value");
    expect(tz.TimeZoneCode).toEqual(expect.any(Number));
  });

  it("an entity is the record, with @odata.etag and @odata.type", async () => {
    const { client } = liveClient();
    const solution = await client.execute(new GetPreferredSolutionFunction());
    expect(solution?.solutionid).toMatch(GUID);
    expect(solution?.["@odata.etag"]).toEqual(expect.any(String));
    // A crmbaseentity return says which table the record is
    expect(solution?.["@odata.type"]).toBe("#Microsoft.Dynamics.CRM.solution");
  });

  it("a message's result is the value its action returns", async () => {
    const { client } = liveClient();
    const action = await client.execute(new CanBeReferencedAction({ EntityName: "account" }));
    const message = await client.execute(new CanBeReferencedRequest({ EntityName: "account" }));
    expect(action.CanBeReferenced).toBe(true);
    expect(message.result).toEqual(action);
  });

  it("a query function (the only primitive returns) can't be called on its own", async () => {
    const { client } = liveClient();
    await expect(
      client.execute(new TodayFunction({ PropertyName: "createdon" }))
    ).rejects.toMatchObject({ status: 404 });
  });
});
