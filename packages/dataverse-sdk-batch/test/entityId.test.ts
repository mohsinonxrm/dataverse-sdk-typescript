/**
 * #274: `entityIdFromBatchResponse` reads the created record's id from a `$batch` response part:
 * from `OData-EntityId` / `Location` for a plain create, or from the body for a create sent with
 * `Prefer: return=representation`, which Dataverse answers with no id header (verified live).
 * A real DataverseClient and a fake fetch.
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
const OWNER = "00000000-0000-0000-0000-000000000003";
const API = "https://contoso.crm.dynamics.com/api/data/v9.2";

/**
 * A 201 part as Dataverse returns it for `Prefer: return=representation`: the record in the body,
 * `Preference-Applied`, and no `OData-EntityId` or `Location`.
 */
const representation = {
  status: 201,
  headers: { "Preference-Applied": "return=representation" },
  body: {
    "@odata.context": `${API}/$metadata#contacts/$entity`,
    "@odata.etag": 'W/"1234567"',
    contactid: CONTACT,
    _ownerid_value: OWNER,
    lastname: "Doe",
  },
};

function setup() {
  const { client, fake } = createTestClient();
  fake.on("POST", "/$batch", () =>
    batchResponse([
      { status: 204, headers: { "OData-EntityId": `${API}/accounts(${ACCOUNT})` } },
      { changeset: [{ ...representation, contentId: "contact" }] },
    ])
  );
  const batch = new BatchRequestBuilder(client);
  batch.addRequest("acct", "POST", "accounts", undefined, { name: "Contoso" });
  batch.beginChangeset();
  batch.addRequest(
    "contact",
    "POST",
    "contacts",
    { prefer: "return=representation" },
    { lastname: "Doe" }
  );
  batch.endChangeset();
  return batch;
}

describe("entityIdFromBatchResponse (#274)", () => {
  it("reads a plain create's id from its headers, and a return=representation create's from its body", async () => {
    const result = await setup().execute();
    const acct = result.responses.get("acct");
    const contact = result.responses.get("contact");
    expect(acct && entityIdFromBatchResponse(acct)).toBe(ACCOUNT);
    expect(contact && entityIdFromBatchResponse(contact, { primaryIdAttribute: "contactid" })).toBe(
      CONTACT
    );
  });

  it("a return=representation create without primaryIdAttribute throws, saying what to pass", async () => {
    const result = await setup().execute();
    const contact = result.responses.get("contact") ?? { headers: {} };
    expect(() => entityIdFromBatchResponse(contact)).toThrow(DataverseInvalidRequestError);
    expect(() => entityIdFromBatchResponse(contact)).toThrow(
      /no OData-EntityId or Location header.*Prefer: return=representation.*primaryIdAttribute/
    );
  });

  it("throws when the body has no GUID in primaryIdAttribute", () => {
    const cases: unknown[] = [
      undefined,
      "not json",
      { lastname: "Doe" },
      { contactid: null },
      { contactid: "not-a-guid" },
    ];
    for (const body of cases) {
      expect(() =>
        entityIdFromBatchResponse({ headers: {}, body }, { primaryIdAttribute: "contactid" })
      ).toThrow(/no OData-EntityId or Location header.*body has no GUID in "contactid"/);
    }
  });

  it("the headers win over the body", () => {
    expect(
      entityIdFromBatchResponse(
        { headers: { "odata-entityid": `${API}/contacts(${ACCOUNT})` }, body: representation.body },
        { primaryIdAttribute: "contactid" }
      )
    ).toBe(ACCOUNT);
  });

  it("an alternate-key URL in the header falls back to the body", () => {
    expect(
      entityIdFromBatchResponse(
        {
          headers: { "odata-entityid": `${API}/contacts(emailaddress1='a@contoso.com')` },
          body: representation.body,
        },
        { primaryIdAttribute: "contactid" }
      )
    ).toBe(CONTACT);
  });

  it("reads parts from decodeBatchResponse() of a recorded Dataverse response", () => {
    const r = recorded.changesetSuccess;
    const parts = decodeBatchResponse(r.body, r.contentType);
    const created = parts.filter((p) => p.inChangeset);
    expect(created.map((p) => entityIdFromBatchResponse(p))).toEqual([
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
    expect(
      entityIdFromBatchResponse({ headers: { LOCATION: `${API}/accounts(${CONTACT})` } })
    ).toBe(CONTACT);
  });

  it("throws DataverseInvalidRequestError when no header holds an id and no key is given", () => {
    expect(() => entityIdFromBatchResponse({ headers: {} })).toThrow(DataverseInvalidRequestError);
    expect(() =>
      entityIdFromBatchResponse({
        headers: { "odata-entityid": `${API}/accounts(accountnumber='A-1')` },
      })
    ).toThrow(DataverseInvalidRequestError);
    expect(() =>
      entityIdFromBatchResponse({ headers: { location: "https://contoso.example/\u{1F600}" } })
    ).toThrow(DataverseInvalidRequestError);
    expect(() =>
      entityIdFromBatchResponse(
        { headers: {}, body: representation.body },
        { primaryIdAttribute: "" }
      )
    ).toThrow(/pass \{ primaryIdAttribute \}/);
  });
});
