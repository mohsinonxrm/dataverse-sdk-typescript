/**
 * Contract tests: BatchRequestBuilder against a real DataverseClient and a fake fetch.
 * The older BatchRequestBuilder.test.ts mocks `client.api().post()` with a Response-like
 * object the real builder never returns, which is how #54 shipped (#39).
 *
 * `it.fails` pins a known bug; flip it to `it` in the PR that fixes the linked issue.
 */
import { describe, it, expect } from "vitest";
import { batchResponse, createTestClient } from "@mohsinonxrm/dataverse-sdk-testing";
import { BatchRequestBuilder } from "../src/index.js";

const ACCOUNT = "00000000-0000-0000-0000-000000000001";

function batchWithGetAndChangeset(builder: BatchRequestBuilder): BatchRequestBuilder {
  builder.addRequest("get", "GET", "/accounts?$select=name&$top=1");
  builder.beginChangeset();
  builder.addRequest("create", "POST", "/accounts", undefined, { name: "Contoso" });
  builder.endChangeset();
  return builder;
}

const okResponse = () =>
  batchResponse([
    { status: 200, body: { value: [{ name: "A" }] } },
    {
      changeset: [
        {
          status: 204,
          contentId: "1",
          headers: {
            "OData-EntityId": `https://contoso.crm.dynamics.com/api/data/v9.2/accounts(${ACCOUNT})`,
          },
        },
      ],
    },
  ]);

describe("batch: wire contract", () => {
  it.fails("#54: execute() sends one multipart POST to $batch", async () => {
    const { client, fake } = createTestClient();
    fake.on("POST", "/$batch", okResponse);
    // Today execute() throws while parsing the response; assert on what was sent either way.
    await batchWithGetAndChangeset(new BatchRequestBuilder(client))
      .execute()
      .catch(() => undefined);
    const r = fake.last();
    expect(r.method).toBe("POST");
    expect(r.headers["content-type"]).toMatch(/^multipart\/mixed; ?boundary=batch_/);
    expect(r.bodyText?.startsWith("--batch_")).toBe(true);
  });

  it.fails("#54: execute() parses the multipart response", async () => {
    const { client, fake } = createTestClient();
    fake.on("POST", "/$batch", okResponse);
    const result = await batchWithGetAndChangeset(new BatchRequestBuilder(client)).execute();
    expect(result.success).toBe(true);
  });

  it.fails("#54: continueOnError sends Prefer: odata.continue-on-error", async () => {
    const { client, fake } = createTestClient();
    fake.on("POST", "/$batch", okResponse);
    await batchWithGetAndChangeset(new BatchRequestBuilder(client))
      .execute({ continueOnError: true })
      .catch(() => undefined);
    expect(fake.last().headers.prefer ?? "").toContain("odata.continue-on-error");
  });
});
