/**
 * Contract tests: OrganizationService against a real DataverseClient and a fake fetch.
 * The existing OrganizationService.test.ts mocks the request builder with a contract the real
 * builder doesn't have, which is how #83 shipped (#39).
 *
 * `it.fails` pins a known bug; flip it to `it` in the PR that fixes the linked issue.
 */
import { describe, it, expect } from "vitest";
import {
  createTestClient,
  createdResponse,
  jsonResponse,
  noContent,
} from "@mohsinonxrm/dataverse-sdk-testing";
import { OrganizationService } from "../src/index.js";

const ID = "00000000-0000-0000-0000-000000000001";

describe("xrm: OrganizationService wire contract", () => {
  it("#83: create() returns the new id from OData-EntityId", async () => {
    const { client, fake } = createTestClient();
    fake.on("POST", "/accounts", () => createdResponse("accounts", ID));
    const service = new OrganizationService(client);
    await expect(service.create("accounts", { name: "Contoso" })).resolves.toBe(ID);
    expect(JSON.parse(fake.last().bodyText ?? "")).toEqual({ name: "Contoso" });
  });

  it("#83: retrieve() returns the record", async () => {
    const { client, fake } = createTestClient();
    fake.on("GET", `/accounts(${ID})`, () => jsonResponse({ accountid: ID, name: "Contoso" }));
    const service = new OrganizationService(client);
    await expect(service.retrieve("accounts", ID, { select: ["name"] })).resolves.toMatchObject({
      name: "Contoso",
    });
  });

  it("update() sends a PATCH and resolves", async () => {
    const { client, fake } = createTestClient();
    fake.on("PATCH", `/accounts(${ID})`, () => noContent());
    const service = new OrganizationService(client);
    await service.update("accounts", ID, { name: "Renamed" });
    expect(fake.last().method).toBe("PATCH");
  });

  it("#83: update() sends the If-Match etag and impersonation headers", async () => {
    const { client, fake } = createTestClient();
    fake.on("PATCH", `/accounts(${ID})`, () => noContent());
    const service = new OrganizationService(client);
    await service.update(
      "accounts",
      ID,
      { name: "Renamed" },
      { etag: 'W/"1"', impersonateUserId: ID }
    );
    expect(fake.last().headers["if-match"]).toBe('W/"1"');
    expect(fake.last().headers.mscrmcallerid).toBe(ID);
  });

  it("#83: update() with returnRepresentation returns the updated record", async () => {
    const { client, fake } = createTestClient();
    fake.on("PATCH", `/accounts(${ID})`, () => jsonResponse({ accountid: ID, name: "Renamed" }));
    const service = new OrganizationService(client);
    await expect(
      service.update("accounts", ID, { name: "Renamed" }, { returnRepresentation: true })
    ).resolves.toMatchObject({ name: "Renamed" });
  });

  it("delete() sends a DELETE to the record", async () => {
    const { client, fake } = createTestClient();
    fake.on("DELETE", `/accounts(${ID})`, () => noContent());
    const service = new OrganizationService(client);
    await service.delete("accounts", ID);
    expect(fake.last().method).toBe("DELETE");
    expect(fake.last().headers.authorization).toBe("Bearer test-token");
  });
});
