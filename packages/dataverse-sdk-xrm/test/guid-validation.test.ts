/**
 * #53: ids and names placed in URLs go through core's OData helpers. A malformed GUID throws
 * `DataverseInvalidRequestError` before any request is sent, and quotes in names are escaped.
 */
import { describe, it, expect } from "vitest";
import { DataverseInvalidRequestError } from "@mohsinonxrm/dataverse-sdk-core";
import { createTestClient, jsonResponse, noContent } from "@mohsinonxrm/dataverse-sdk-testing";
import { OrganizationService, createEntityReference } from "../src/index.js";

const ID = "12345678-1234-1234-1234-123456789012";
const BAD = ["not-a-guid", `${ID})/../systemusers(${ID}`, "", `${ID}x`];

function service() {
  const { client, fake } = createTestClient();
  fake.on("GET", /^\/EntityDefinitions/, () => jsonResponse({ EntitySetName: "things" }));
  fake.on("GET", /.*/, () => jsonResponse({}));
  fake.on("PATCH", /.*/, () => noContent());
  fake.on("DELETE", /.*/, () => noContent());
  fake.on("POST", /.*/, () => noContent());
  return {
    svc: new OrganizationService(client, {
      entitySetNames: { account: "accounts", contact: "contacts", systemuser: "systemusers" },
    }),
    fake,
  };
}

describe("#53: GUID ids are validated", () => {
  for (const bad of BAD) {
    it(`rejects ${JSON.stringify(bad)} everywhere an id is a key`, async () => {
      const { svc, fake } = service();
      const rel = [createEntityReference("contact", ID)];
      const calls: Array<() => Promise<unknown>> = [
        () => svc.retrieve("accounts", bad),
        () => svc.update("accounts", bad, { name: "x" }),
        () => svc.delete("accounts", bad),
        () => svc.associate("accounts", bad, "rel", rel),
        () => svc.associate("accounts", ID, "rel", [createEntityReference("contact", bad)]),
        () => svc.disassociate("accounts", bad, "rel"),
        () => svc.disassociate("accounts", ID, "rel", bad),
        () => svc.assign("account", bad, ID),
        () => svc.assign("account", ID, bad),
        () => svc.setState("account", bad, 1, 2),
      ];
      for (const call of calls) {
        await expect(call()).rejects.toBeInstanceOf(DataverseInvalidRequestError);
      }
      expect(fake.requests.filter((r) => r.method !== "GET")).toHaveLength(0);
    });
  }

  it("still accepts braces and upper case", async () => {
    const { svc, fake } = service();
    await svc.retrieve("accounts", `{${ID.toUpperCase()}}`);
    expect(fake.last().path).toBe(`/accounts(${ID})`);
  });
});

describe("#53: names with quotes are escaped", () => {
  it("doubles the quote in an entity logical name lookup", async () => {
    const { client, fake } = createTestClient();
    fake.on("GET", /^\/EntityDefinitions/, () => jsonResponse({ EntitySetName: "obriens" }));
    await new OrganizationService(client).getEntitySetName("O'Brien");
    expect(decodeURIComponent(fake.last().path.split("?")[0] ?? "")).toBe(
      "/EntityDefinitions(LogicalName='o''brien')"
    );
  });
});
