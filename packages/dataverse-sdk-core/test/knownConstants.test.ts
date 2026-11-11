/**
 * #481: known Dataverse constants (error codes, headers, Prefer annotation terms) and
 * `hasErrorCode()`, and the SDK's own checks that use it.
 */
import { describe, expect, it } from "vitest";
import {
  Annotations,
  DataverseClient,
  DataverseError,
  DataverseErrorCode,
  DataverseHeaders,
  DataverseODataError,
  Prefer,
  PreferBuilder,
  hasErrorCode,
  isDeltaLinkExpired,
} from "../src/index.js";

describe("hasErrorCode", () => {
  it("matches a DataverseError's code, ignoring case", () => {
    const err = new DataverseODataError("x", { status: 404, code: "0x80040217" });
    expect(hasErrorCode(err, DataverseErrorCode.ObjectDoesNotExist)).toBe(true);
    expect(hasErrorCode(err, "0X80040217")).toBe(true);
    expect(hasErrorCode(err, DataverseErrorCode.DuplicateRecordsFound)).toBe(false);
    expect(hasErrorCode(new DataverseError("x", { code: "0x8004431A" }), "0x8004431a")).toBe(true);
  });

  it("matches the signed decimal form", () => {
    expect(hasErrorCode("-2147204270", DataverseErrorCode.ExpiredVersionStamp)).toBe(true);
    expect(hasErrorCode("0x80044352", "-2147204270")).toBe(true);
    expect(hasErrorCode("-2147204271", DataverseErrorCode.ExpiredVersionStamp)).toBe(false);
  });

  it("takes a code string, or any object with a string code", () => {
    expect(hasErrorCode("0x80072326", DataverseErrorCode.ServiceProtectionConcurrentRequests)).toBe(
      true
    );
    expect(hasErrorCode({ code: "0x80090017" }, "0x80090017")).toBe(true);
    expect(hasErrorCode({ code: 42 }, "0x80090017")).toBe(false);
    expect(hasErrorCode(new Error("x"), "0x80090017")).toBe(false);
    expect(hasErrorCode(undefined, "0x80090017")).toBe(false);
    expect(hasErrorCode(null, "0x80090017")).toBe(false);
  });

  it("compares a code that isn't hex or decimal as is, ignoring case", () => {
    expect(hasErrorCode({ code: "Throttled" }, "throttled")).toBe(true);
    expect(hasErrorCode({ code: "Throttled" }, "0x80072322")).toBe(false);
  });

  it("isDeltaLinkExpired accepts the hex code in any case and the decimal code", () => {
    expect(isDeltaLinkExpired(new DataverseError("x", { code: "0x80044352" }))).toBe(true);
    expect(isDeltaLinkExpired(new DataverseError("x", { code: "0X80044352" }))).toBe(true);
    expect(isDeltaLinkExpired(new DataverseError("x", { code: "-2147204270" }))).toBe(true);
    expect(isDeltaLinkExpired(new DataverseError("x", { code: "0x80040217" }))).toBe(false);
    expect(isDeltaLinkExpired({ code: "0x80044352" })).toBe(false);
  });
});

describe("known constants", () => {
  it("have the values Dataverse documents", () => {
    expect(DataverseErrorCode).toEqual({
      ObjectDoesNotExist: "0x80040217",
      DuplicateRecordsFound: "0x80040333",
      ExpiredVersionStamp: "0x80044352",
      ConcurrencyVersionMismatch: "0x80060882",
      ServiceProtectionRequests: "0x80072322",
      ServiceProtectionExecutionTime: "0x80072321",
      ServiceProtectionConcurrentRequests: "0x80072326",
      UploadingAndDownloadingInMultipleChunksNotSupported: "0x80090017",
    });
    expect(DataverseHeaders.BypassBusinessLogicExecution).toBe(
      "MSCRM.BypassBusinessLogicExecution"
    );
    expect(DataverseHeaders.Consistency).toBe("Consistency");
    expect(Annotations.FormattedValue).toBe("OData.Community.Display.V1.FormattedValue");
  });

  it("build the Prefer values", () => {
    expect(Prefer.includeAnnotations(Annotations.LookupLogicalName)).toBe(
      'odata.include-annotations="Microsoft.Dynamics.CRM.lookuplogicalname"'
    );
    expect(new PreferBuilder().formattedValues(Annotations.All).build()).toBe(
      'odata.include-annotations="*"'
    );
  });

  it("header() sends a DataverseHeaders name with its value", async () => {
    let sent: Headers | undefined;
    const client = new DataverseClient({
      baseUrl: "https://org.crm.dynamics.com",
      retry: { maxRetries: 0 },
      fetchProvider: {
        fetch: (_input, init) => {
          sent = new Headers(init?.headers);
          return Promise.resolve(new Response(null, { status: 204 }));
        },
      },
    });
    await client
      .api("accounts")
      .header(DataverseHeaders.BypassBusinessLogicExecution, "CustomSync,CustomAsync")
      .header(DataverseHeaders.Consistency, "Strong")
      .post({ name: "a" });
    expect(sent?.get("MSCRM.BypassBusinessLogicExecution")).toBe("CustomSync,CustomAsync");
    expect(sent?.get("Consistency")).toBe("Strong");
  });
});
