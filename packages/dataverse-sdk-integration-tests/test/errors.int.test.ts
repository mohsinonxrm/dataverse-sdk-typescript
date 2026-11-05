/**
 * #19 live: an HTTP error from a real org carries the details support needs. Nothing is created.
 * Assertions compare shapes only, so no org details reach the test output.
 */
import { describe, expect, it } from "vitest";
import { DataverseError, DataverseODataError } from "@mohsinonxrm/dataverse-sdk-core";
import { live, liveClient } from "./env.js";

describe.skipIf(!live)("live: error model (#19)", () => {
  it("a 404 is a DataverseODataError with code, requestId, correlationId and headers", async () => {
    const { client } = liveClient();
    const err: unknown = await client
      .api("accounts(00000000-0000-0000-0000-000000000000)")
      .select("name")
      .get()
      .then(
        () => undefined,
        (e: unknown) => e
      );
    expect(err).toBeInstanceOf(DataverseODataError);
    expect(err).toBeInstanceOf(DataverseError);
    const e = err as DataverseODataError;
    expect(e.status).toBe(404);
    expect(e.code).toMatch(/^0x[0-9a-f]{8}$/i);
    expect(typeof e.requestId === "string" && e.requestId.length > 0).toBe(true);
    expect(e.requestId).toBe(e.headers?.["x-ms-service-request-id"]?.split(",")[0]?.trim());
    expect(typeof e.correlationId === "string" && e.correlationId.length === 36).toBe(true);
    expect(typeof e.headers?.["content-type"]).toBe("string");
  });
});
