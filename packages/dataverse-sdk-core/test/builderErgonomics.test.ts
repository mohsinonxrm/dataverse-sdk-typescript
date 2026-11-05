/**
 * #49: `prefer()` keeps the chain (`done()` or a callback), and `expand()` takes an options object
 * after a navigation property, as the docs and xrm use it.
 */
import { describe, expect, it } from "vitest";
import { DataverseClient } from "../src/client/DataverseClient.js";
import { PreferBuilder } from "../src/client/PreferBuilder.js";
import { Prefer } from "../src/abstractions/options.js";
import { formatExpand } from "../src/odata/expand.js";

const ORG = "https://contoso.crm.dynamics.com";

function setup() {
  const sent: Array<{ url: URL; prefer: string | null }> = [];
  const client = new DataverseClient({
    baseUrl: ORG,
    retry: { maxRetries: 0 },
    fetchProvider: {
      fetch: (input, init) => {
        sent.push({
          url: new URL(input instanceof Request ? input.url : input.toString()),
          prefer: new Headers(init?.headers).get("prefer"),
        });
        return Promise.resolve(
          new Response('{"value":[]}', { headers: { "content-type": "application/json" } })
        );
      },
    },
  });
  return { client, sent };
}

describe("#49: prefer() keeps the chain", () => {
  it("prefer()…done() returns the request builder", async () => {
    const { client, sent } = setup();
    await client.api("accounts").prefer().allAnnotations().maxPageSize(50).done().get();
    expect(sent[0]?.prefer).toBe('odata.include-annotations="*",odata.maxpagesize=50');
  });

  it("prefer(callback) configures it and returns the request builder", async () => {
    const { client, sent } = setup();
    await client
      .api("accounts")
      .prefer((p) => p.formattedValues().returnRepresentation())
      .prefer(Prefer.continueOnError())
      .select("name")
      .get();
    expect(sent[0]?.prefer).toBe(
      'odata.continue-on-error, odata.include-annotations="OData.Community.Display.V1.FormattedValue",return=representation'
    );
    expect(sent[0]?.url.searchParams.get("$select")).toBe("name");
  });

  it("calling prefer() twice adds to the same preferences", async () => {
    const { client, sent } = setup();
    const request = client.api("accounts");
    request.prefer().maxPageSize(10);
    await request.prefer().trackChanges().done().get();
    expect(sent[0]?.prefer).toBe("odata.maxpagesize=10,odata.track-changes");
  });

  it("done() on a stand-alone PreferBuilder throws", () => {
    expect(() => {
      new PreferBuilder().allAnnotations().done();
    }).toThrow(/prefer\(\)/);
  });
});

describe("#49: expand() options", () => {
  it("formats the options of the navigation property before them", async () => {
    const { client, sent } = setup();
    await client
      .api("accounts")
      .expand("primarycontactid", { select: ["fullname", "emailaddress1"] })
      .get();
    expect(sent[0]?.url.searchParams.get("$expand")).toBe(
      "primarycontactid($select=fullname,emailaddress1)"
    );
  });

  it("mixes strings and options, and calls add up (as xrm calls it once per expansion)", async () => {
    const { client, sent } = setup();
    await client
      .api("accounts")
      .expand("owninguser", "contact_customer_accounts", {
        select: ["fullname"],
        filter: "statecode eq 0",
        orderBy: "fullname desc",
        top: 5,
      })
      .expand("primarycontactid", { select: ["fullname"] })
      .get();
    expect(sent[0]?.url.searchParams.get("$expand")).toBe(
      "owninguser,contact_customer_accounts($select=fullname;$filter=statecode eq 0;$orderby=fullname desc;$top=5),primarycontactid($select=fullname)"
    );
  });

  it("an options object without a navigation property before it throws", () => {
    const { client } = setup();
    expect(() => client.api("accounts").expand({ select: ["name"] })).toThrow(
      expect.objectContaining({ name: "InvalidParameter" })
    );
  });

  it("formatExpand handles nested expansions and empty options", () => {
    expect(formatExpand("a")).toBe("a");
    expect(formatExpand("a", {})).toBe("a");
    expect(formatExpand("a", { select: [], orderBy: [], expand: "" })).toBe("a");
    expect(formatExpand("a", { orderBy: ["x", "y desc"], expand: "b($select=c)" })).toBe(
      "a($orderby=x,y desc;$expand=b($select=c))"
    );
    expect(
      formatExpand("parentaccountid", {
        select: ["name"],
        expand: { primarycontactid: { select: ["fullname"] }, owninguser: true },
      })
    ).toBe("parentaccountid($select=name;$expand=primarycontactid($select=fullname),owninguser)");
    expect(formatExpand("a", { expand: {} })).toBe("a");
  });
});
