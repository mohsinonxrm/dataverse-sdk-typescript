/**
 * #53 live: values with `'` in a filter and in function parameters, through odataLiteral.
 * Creates one contact and deletes it afterwards.
 */
import { afterAll, describe, expect, it } from "vitest";
import { odata, odataKey, odataLiteral } from "@mohsinonxrm/dataverse-sdk-core";
import { live, liveClient, runId } from "./env.js";

const lastname = `O'Brien ${runId}`;
let contactId: string | undefined;

afterAll(async () => {
  if (!live || !contactId) return;
  await liveClient()
    .client.api(`contacts(${contactId})`)
    .delete()
    .catch(() => undefined);
});

describe.skipIf(!live)("live: OData literals (#53)", () => {
  it("finds O'Brien with odata.eq", async () => {
    const { client } = liveClient();
    contactId = await client.api("contacts").createAndGetId({ lastname });
    const found = await client
      .api("contacts")
      .select("lastname")
      .filter(odata.eq("lastname", lastname))
      .get<{ value: Array<{ lastname: string }> }>();
    expect(found.value.map((c) => c.lastname)).toEqual([lastname]);

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
