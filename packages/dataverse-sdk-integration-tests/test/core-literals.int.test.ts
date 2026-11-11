/**
 * #53 live: values with `'` in a filter and in function parameters, through odataLiteral.
 * Creates one contact in beforeAll (once, whatever happens to the tests) and deletes it afterwards.
 */
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { odata, odataKey, odataLiteral } from "@mohsinonxrm/dataverse-sdk-core";
import { live, liveClient, runId } from "./env.js";

// Starts with "sdk-int " so the sweeper finds it if it's ever left behind
const lastname = `sdk-int O'Brien ${runId}`;
const ids: string[] = [];

beforeAll(async () => {
  if (!live) return;
  ids.push(await liveClient().client.api("contacts").createAndGetId({ lastname }));
});

afterAll(async () => {
  if (!live) return;
  const { client } = liveClient();
  for (const id of ids) {
    await client
      .api(`contacts(${id})`)
      .delete()
      .catch(() => undefined);
  }
});

describe.skipIf(!live)("live: OData literals (#53)", () => {
  it("finds O'Brien with odata.eq", async () => {
    const { client } = liveClient();
    const contactId = ids[0] ?? "";
    const found = await client
      .api("contacts")
      .select("contactid", "lastname")
      .filter(odata.eq("lastname", lastname))
      .get<{ value: Array<{ contactid: string; lastname: string }> }>();
    expect(found.value.map((c) => [c.contactid, c.lastname])).toEqual([[contactId, lastname]]);

    // The same record by its key, formatted with odataKey.
    const byKey = await client
      .api(`contacts(${odataKey(`{${contactId}}`)})`)
      .select("lastname")
      .get<{ lastname: string }>();
    expect(byKey.lastname).toBe(lastname);
  });

  it("passes O'Brien to a function, inline and as a parameter alias", async () => {
    const { client } = liveClient();
    const line1 = "1 O'Brien St";
    const inline = await client
      .api(
        `FormatAddress(Line1=${odataLiteral.string(line1)},City=${odataLiteral.string("Dublin")},` +
          `StateOrProvince=${odataLiteral.string("")},PostalCode=${odataLiteral.string("D02")},` +
          `Country=${odataLiteral.string("Ireland")})`
      )
      .get<{ Address: string }>();
    expect(inline.Address).toContain(line1);

    const alias = (v: string) => encodeURIComponent(odataLiteral.string(v));
    const viaAlias = await client
      .api(
        `FormatAddress(Line1=@p1,City=@p2,StateOrProvince=@p3,PostalCode=@p4,Country=@p5)` +
          `?@p1=${alias(line1)}&@p2=${alias("Dublin")}&@p3=${alias("")}&@p4=${alias("D02")}&@p5=${alias("Ireland")}`
      )
      .get<{ Address: string }>();
    expect(viaAlias.Address).toBe(inline.Address);
  });
});
