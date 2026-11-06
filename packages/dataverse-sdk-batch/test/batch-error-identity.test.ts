/**
 * #271: core and batch export the same DataverseBatchError, so `instanceof` works whichever
 * package the class is imported from, and the error `execute()` throws keeps `result` and the
 * per-part errors.
 */
import { describe, it, expect } from "vitest";
import { createTestClient } from "@mohsinonxrm/dataverse-sdk-testing";
import {
  DataverseBatchError as CoreBatchError,
  DataverseError,
  DataverseODataError,
} from "@mohsinonxrm/dataverse-sdk-core";
import { BatchRequestBuilder, DataverseBatchError as BatchBatchError } from "../src/index.js";

const BOUNDARY = "batchresponse_1";
const failing =
  `--${BOUNDARY}\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\n` +
  `HTTP/1.1 404 Not Found\r\nContent-Type: application/json; odata.metadata=minimal\r\n\r\n` +
  `{"error":{"code":"0x80040217","message":"Does Not Exist"}}\r\n--${BOUNDARY}--\r\n`;

async function failedBatch(): Promise<unknown> {
  const { client, fake } = createTestClient();
  fake.on(
    "POST",
    "/$batch",
    () =>
      new Response(failing, {
        status: 404,
        headers: { "content-type": `multipart/mixed; boundary=${BOUNDARY}` },
      })
  );
  const builder = new BatchRequestBuilder(client);
  builder.addRequest("del", "DELETE", "accounts(00000000-0000-0000-0000-000000000001)");
  return builder.execute().then(
    () => undefined,
    (e: unknown) => e
  );
}

describe("one DataverseBatchError (#271)", () => {
  it("is the same class from both packages", () => {
    expect(BatchBatchError).toBe(CoreBatchError);
  });

  it("execute() throws an error that is instanceof the class imported from core and from batch", async () => {
    const err = await failedBatch();
    expect(err).toBeInstanceOf(CoreBatchError);
    expect(err).toBeInstanceOf(BatchBatchError);
    expect(err).toBeInstanceOf(DataverseError);
  });

  it("keeps result, requestErrors and the per-part errors", async () => {
    const err = (await failedBatch()) as BatchBatchError;
    expect(err.name).toBe("DataverseBatchError");
    expect(
      err.result?.results.map((r: { id: string; status: number }) => [r.id, r.status])
    ).toEqual([["del", 404]]);
    expect(err.getFailedRequestIds()).toEqual(["del"]);
    expect(err.failedRequests).toBe(1);
    expect(err.partErrors).toHaveLength(1);
    expect(err.partErrors?.[0]).toMatchObject({ index: 0, status: 404 });
    expect(err.partErrors?.[0]?.error).toBeInstanceOf(DataverseODataError);
  });

  it("core's class can still be built with just a message and partErrors", () => {
    const part = new DataverseODataError("x", { status: 400 });
    const err = new CoreBatchError("boom", {
      partErrors: [{ index: 2, status: 400, error: part }],
    });
    expect(err).toBeInstanceOf(BatchBatchError);
    expect(err.partErrors).toEqual([{ index: 2, status: 400, error: part }]);
    expect(err.requestErrors.size).toBe(0);
  });
});
