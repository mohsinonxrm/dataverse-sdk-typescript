/**
 * Contract tests: BatchRequestBuilder against a real DataverseClient and a fake fetch.
 * The older BatchRequestBuilder.test.ts used to mock `client.api().post()` with a Response-like
 * object the real builder never returns, which is how #54 shipped (#39).
 *
 * `it.fails` pins a known bug; flip it to `it` in the PR that fixes the linked issue.
 */
import { describe, it, expect } from "vitest";
import {
  batchResponse,
  createTestClient,
  odataError,
  TEST_API_URL,
  throttled,
} from "@mohsinonxrm/dataverse-sdk-testing";
import { DataverseODataError, DataverseThrottleError } from "@mohsinonxrm/dataverse-sdk-core";
import { BatchRequestBuilder, DataverseBatchError } from "../src/index.js";
import * as recorded from "./fixtures/recorded.js";

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
          contentId: "create",
          headers: {
            "OData-EntityId": `https://contoso.crm.dynamics.com/api/data/v9.2/accounts(${ACCOUNT})`,
          },
        },
      ],
    },
  ]);

const fromRecording = (r: recorded.RecordedBatchResponse) => () =>
  new Response(r.body, { status: r.status, headers: { "content-type": r.contentType } });

describe("batch: wire contract", () => {
  it("#54: execute() sends one multipart POST to $batch", async () => {
    const { client, fake } = createTestClient();
    fake.on("POST", "/$batch", okResponse);
    await batchWithGetAndChangeset(new BatchRequestBuilder(client)).execute();
    expect(fake.requests).toHaveLength(1);
    const r = fake.last();
    expect(r.method).toBe("POST");
    expect(r.url).toBe(`${TEST_API_URL}/$batch`);
    expect(r.headers["content-type"]).toMatch(/^multipart\/mixed; ?boundary=batch_/);
    expect(r.bodyText?.startsWith("--batch_")).toBe(true);
  });

  it("#54: execute() parses the multipart response", async () => {
    const { client, fake } = createTestClient();
    fake.on("POST", "/$batch", okResponse);
    const result = await batchWithGetAndChangeset(new BatchRequestBuilder(client)).execute();
    expect(result.success).toBe(true);
  });

  it("#54: continueOnError sends Prefer: odata.continue-on-error", async () => {
    const { client, fake } = createTestClient();
    fake.on("POST", "/$batch", okResponse);
    await batchWithGetAndChangeset(new BatchRequestBuilder(client))
      .execute({ continueOnError: true })
      .catch(() => undefined);
    expect(fake.last().headers.prefer ?? "").toContain("odata.continue-on-error");
  });

  it("#54: the body on the wire is exactly the encoded batch, with one content type", async () => {
    const { client, fake } = createTestClient();
    fake.on("POST", "/$batch", okResponse);
    await batchWithGetAndChangeset(new BatchRequestBuilder(client)).execute();
    const r = fake.last();
    const boundary = /boundary=(\S+)$/.exec(r.headers["content-type"] ?? "")?.[1] ?? "";
    // The change set boundary is random; read it back from the body.
    const cs = /boundary=(changeset_\S+)\r\n/.exec(r.bodyText ?? "")?.[1] ?? "";
    expect(r.headers["content-type"]).toBe(`multipart/mixed; boundary=${boundary}`);
    expect(r.rawBody).toBe(r.bodyText); // a string, not JSON-quoted
    expect(r.bodyText).toBe(
      [
        `--${boundary}`,
        "Content-Type: application/http",
        "Content-Transfer-Encoding: binary",
        "",
        `GET ${TEST_API_URL}/accounts?$select=name&$top=1 HTTP/1.1`,
        "",
        `--${boundary}`,
        `Content-Type: multipart/mixed; boundary=${cs}`,
        "",
        `--${cs}`,
        "Content-Type: application/http",
        "Content-Transfer-Encoding: binary",
        "Content-ID: create",
        "",
        `POST ${TEST_API_URL}/accounts HTTP/1.1`,
        "Content-Type: application/json; type=entry",
        "",
        '{"name":"Contoso"}',
        `--${cs}--`,
        "",
        `--${boundary}--`,
        "",
      ].join("\r\n")
    );
    expect(r.headers.authorization).toBe("Bearer test-token");
    expect(r.headers["odata-version"]).toBe("4.0");
  });

  it("#54: the caller's headers go on the batch request; Prefer values are merged", async () => {
    const { client, fake } = createTestClient();
    fake.on("POST", "/$batch", okResponse);
    await batchWithGetAndChangeset(new BatchRequestBuilder(client)).execute({
      continueOnError: true,
      headers: {
        "X-Custom": "value",
        Prefer: 'odata.include-annotations="*"',
        "Content-Type": "application/json",
      },
    });
    const h = fake.last().headers;
    expect(h["x-custom"]).toBe("value");
    expect(h.prefer).toBe('odata.include-annotations="*", odata.continue-on-error');
    expect(h["content-type"]).toMatch(/^multipart\/mixed; boundary=batch_/);
  });

  it("#54: a recorded Dataverse response is matched back to the caller's ids", async () => {
    const { client, fake } = createTestClient();
    fake.on("POST", "/$batch", fromRecording(recorded.changesetSuccess));
    const b = new BatchRequestBuilder(client);
    b.addRequest("who", "GET", "WhoAmI");
    b.beginChangeset();
    b.addRequest("acct", "POST", "accounts", undefined, { name: "A" });
    b.addRequest(
      "contact",
      "POST",
      "contacts",
      undefined,
      { lastname: "B", "parentcustomerid_account@odata.bind": "$acct" },
      ["acct"]
    );
    b.endChangeset();
    const result = await b.execute();
    expect(result.results.map((r) => [r.id, r.status])).toEqual([
      ["who", 200],
      ["acct", 204],
      ["contact", 204],
    ]);
    expect(result.responses.get("who")?.body.UserId).toBe("10000000-0000-0000-0000-000000000003");
  });

  it("#54: a 404 $batch with a multipart body is decoded, not thrown as a transport error", async () => {
    const { client, fake } = createTestClient();
    fake.on("POST", "/$batch", fromRecording(recorded.stoppedEarly));
    const b = new BatchRequestBuilder(client);
    b.addRequest("who", "GET", "WhoAmI");
    b.addRequest("del", "DELETE", `accounts(${ACCOUNT})`);
    b.addRequest("who2", "GET", "WhoAmI");
    const err = await b.execute().catch((e: unknown) => e);
    expect(err).toBeInstanceOf(DataverseBatchError);
    expect((err as DataverseBatchError).getFailedRequestIds()).toEqual(["del"]);
  });

  it("#54: a non-multipart error response throws the typed OData error", async () => {
    const { client, fake } = createTestClient();
    fake.on("POST", "/$batch", () =>
      odataError(400, "0x80060888", "The message header '--batch_x' is invalid.")
    );
    const b = new BatchRequestBuilder(client);
    b.addRequest("who", "GET", "WhoAmI");
    const err = await b.execute().catch((e: unknown) => e);
    expect(err).toBeInstanceOf(DataverseODataError);
    expect(err).toMatchObject({ status: 400, code: "0x80060888" });
  });

  it("#54: a throttled $batch throws DataverseThrottleError", async () => {
    const { client, fake } = createTestClient();
    fake.on("POST", "/$batch", () => throttled(7));
    const b = new BatchRequestBuilder(client);
    b.addRequest("who", "GET", "WhoAmI");
    const err = await b.execute().catch((e: unknown) => e);
    expect(err).toBeInstanceOf(DataverseThrottleError);
    expect((err as DataverseThrottleError).retryAfterMs).toBe(7000);
  });

  it("#54: a 2xx response that isn't multipart throws", async () => {
    const { client, fake } = createTestClient();
    fake.on(
      "POST",
      "/$batch",
      () => new Response("{}", { status: 200, headers: { "content-type": "application/json" } })
    );
    const b = new BatchRequestBuilder(client);
    b.addRequest("who", "GET", "WhoAmI");
    await expect(b.execute()).rejects.toThrow('expected multipart/mixed, got "application/json"');
  });
});
