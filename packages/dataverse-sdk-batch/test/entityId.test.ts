/**
 * #274: `entityIdFromBatchResponse` reads the created record's id from a `$batch` response part,
 * the way `entityIdFromResponse` does for a `Response`. A real DataverseClient and a fake fetch.
 */
import { describe, expect, it } from "vitest";
import { batchResponse, createTestClient } from "@mohsinonxrm/dataverse-sdk-testing";
import { DataverseInvalidRequestError } from "@mohsinonxrm/dataverse-sdk-core";
import {
  BatchRequestBuilder,
  decodeBatchResponse,
  entityIdFromBatchResponse,
} from "../src/index.js";
import * as recorded from "./fixtures/recorded.js";

const ACCOUNT = "00000000-0000-0000-0000-000000000001";
const CONTACT = "00000000-0000-0000-0000-000000000002";
const API = "https://contoso.crm.dynamics.com/api/data/v9.2";

describe("entityIdFromBatchResponse (#274)", () => {
  it("reads each create's id from execute() results, inside and outside a change set", async () => {
    const { client, fake } = createTestClient();
    fake.on("POST", "/$batch", () =>
      batchResponse([
        { status: 204, headers: { "OData-EntityId": `${API}/accounts(${ACCOUNT})` } },
        {
          changeset: [
            {
              status: 201,
              contentId: "contact",
              headers: { Location: `${API}/contacts(${CONTACT})` },
              body: { contactid: CONTACT },
            },
          ],
        },
      ])
    );
    const batch = new BatchRequestBuilder(client);
    batch.addRequest("acct", "POST", "accounts", undefined, { name: "Contoso" });
    batch.beginChangeset();
    batch.addRequest("contact", "POST", "contacts", undefined, { lastname: "Doe" });
    batch.endChangeset();

    const result = await batch.execute();

    expect(result.results.map((step) => [step.id, entityIdFromBatchResponse(step)])).toEqual([
      ["acct", ACCOUNT],
      ["contact", CONTACT],
    ]);
  });

  it("reads parts from decodeBatchResponse() of a recorded Dataverse response", () => {
    const r = recorded.changesetSuccess;
    const parts = decodeBatchResponse(r.body, r.contentType);
    const created = parts.filter((p) => p.inChangeset);
    expect(created.map(entityIdFromBatchResponse)).toEqual([
      "10000000-0000-0000-0000-000000000007",
      "10000000-0000-0000-0000-000000000008",
    ]);
  });

  it("prefers OData-EntityId over Location, and matches header names in any case", () => {
    expect(
      entityIdFromBatchResponse({
        headers: {
          Location: `${API}/accounts(${CONTACT})`,
          "OData-EntityId": `${API}/accounts(${ACCOUNT})`,
        },
      })
    ).toBe(ACCOUNT);
  });

  it("throws DataverseInvalidRequestError when no header holds an id", () => {
    expect(() => entityIdFromBatchResponse({ headers: {} })).toThrow(DataverseInvalidRequestError);
    expect(() =>
      entityIdFromBatchResponse({
        headers: { "odata-entityid": `${API}/accounts(accountnumber='A-1')` },
      })
    ).toThrow(DataverseInvalidRequestError);
    expect(() =>
      entityIdFromBatchResponse({ headers: { location: "https://contoso.example/\u{1F600}" } })
    ).toThrow(DataverseInvalidRequestError);
  });
});
