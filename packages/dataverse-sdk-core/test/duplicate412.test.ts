/**
 * #50: with detectDuplicates(), only a duplicate-detection 412 (0x80040333) is a
 * DataverseDuplicateError. Another 412, such as an If-Match etag mismatch (0x80060882), is the
 * typed OData error it is. Bodies are as a live org returns them.
 */
import { describe, expect, it } from "vitest";
import { DataverseClient } from "../src/client/DataverseClient.js";
import { DataverseDuplicateError } from "../src/errors/DataverseDuplicateError.js";
import { DataverseODataError } from "../src/errors/DataverseODataError.js";

const ORG = "https://contoso.crm.dynamics.com";
const ID = "00000000-0000-0000-0000-000000000001";

function clientAnswering(body: string, contentType = "application/json; odata.metadata=minimal") {
  return new DataverseClient({
    baseUrl: ORG,
    retry: { maxRetries: 0 },
    fetchProvider: {
      fetch: () =>
        Promise.resolve(
          new Response(body, { status: 412, headers: { "content-type": contentType } })
        ),
    },
  });
}

const DUPLICATE = JSON.stringify({
  error: {
    code: "0x80040333",
    message:
      "A record was not created or updated because a duplicate of the current record already exists.",
  },
});
const ETAG_MISMATCH = JSON.stringify({
  error: {
    code: "0x80060882",
    message: "The version of the existing record doesn't match the RowVersion property provided.",
  },
});

describe("#50: telling the 412s apart", () => {
  it("a duplicate is a DataverseDuplicateError", async () => {
    const err = await clientAnswering(DUPLICATE)
      .api("accounts")
      .detectDuplicates()
      .post({ name: "Contoso" })
      .catch((e: unknown) => e);
    expect(err).toBeInstanceOf(DataverseDuplicateError);
    expect(err).toMatchObject({
      status: 412,
      message: expect.stringContaining("duplicate") as string,
      duplicates: [],
    });
  });

  it("an etag mismatch with detectDuplicates() is the OData error, not a duplicate", async () => {
    const err = await clientAnswering(ETAG_MISMATCH)
      .api(`accounts(${ID})`)
      .detectDuplicates()
      .ifMatch('W/"1"')
      .patch({ name: "Contoso" })
      .catch((e: unknown) => e);
    expect(err).not.toBeInstanceOf(DataverseDuplicateError);
    expect(err).toBeInstanceOf(DataverseODataError);
    expect(err).toMatchObject({
      status: 412,
      code: "0x80060882",
      message: "The version of the existing record doesn't match the RowVersion property provided.",
    });
  });

  it("duplicate records and the rule id are read when Dataverse sends them", async () => {
    const body = JSON.stringify({
      error: {
        code: "0x80040333",
        message: "Duplicate",
        innererror: {
          duplicateruleid: "00000000-0000-0000-0000-0000000000dd",
          duplicaterecords: [
            { "@odata.id": `accounts(${ID})`, "@odata.type": "#Microsoft.Dynamics.CRM.account" },
          ],
        },
      },
    });
    const err = await clientAnswering(body)
      .api("accounts")
      .detectDuplicates()
      .post({ name: "Contoso" })
      .catch((e: unknown) => e);
    expect(err).toBeInstanceOf(DataverseDuplicateError);
    expect(err).toMatchObject({
      duplicateRuleId: "00000000-0000-0000-0000-0000000000dd",
      duplicates: [{ "@odata.id": `accounts(${ID})` }],
    });
  });

  it("a 412 whose body isn't JSON is the OData error, with the text kept", async () => {
    const err = await clientAnswering("Precondition Failed", "text/plain")
      .api("accounts")
      .detectDuplicates()
      .post({ name: "Contoso" })
      .catch((e: unknown) => e);
    expect(err).toBeInstanceOf(DataverseODataError);
    expect(err).toMatchObject({ status: 412, body: "Precondition Failed" });
  });

  it("without detectDuplicates() a duplicate body is just the OData error, as before", async () => {
    const err = await clientAnswering(DUPLICATE)
      .api("accounts")
      .post({ name: "Contoso" })
      .catch((e: unknown) => e);
    expect(err).toBeInstanceOf(DataverseODataError);
    expect(err).toMatchObject({ code: "0x80040333" });
  });
});
