import { describe, it, expect } from "vitest";
import { validateUrl, URL_LIMITS } from "../src/utils/validateUrl.js";
import { DataverseUrlError } from "../src/errors/DataverseUrlError.js";

describe("validateUrl", () => {
  it("should pass valid URL", () => {
    const result = validateUrl("https://org.crm.dynamics.com/api/data/v9.2/accounts");
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
    expect(result.totalLength).toBeLessThan(URL_LIMITS.MAX_URL_LENGTH);
  });

  it("should pass URL with query string", () => {
    const result = validateUrl(
      "https://org.crm.dynamics.com/api/data/v9.2/accounts?$filter=name eq 'Contoso'&$select=name,revenue"
    );
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it("should fail URL exceeding 32KB", () => {
    const longUrl =
      "https://org.crm.dynamics.com/api/data/v9.2/accounts?$filter=" + "x".repeat(35000);

    expect(() => validateUrl(longUrl)).toThrow(DataverseUrlError);
    expect(() => validateUrl(longUrl)).toThrow(/URL exceeds maximum length of 32768 bytes/);
  });

  it("should fail URL with segment exceeding 260 chars", () => {
    const longSegment = "x".repeat(300);
    const url = `https://org.crm.dynamics.com/api/data/v9.2/accounts?$filter=${longSegment}`;

    expect(() => validateUrl(url)).toThrow(DataverseUrlError);
    expect(() => validateUrl(url)).toThrow(/URL segment exceeds maximum length of 260 characters/);
  });

  it("should skip validation when requested", () => {
    const longUrl =
      "https://org.crm.dynamics.com/api/data/v9.2/accounts?$filter=" + "x".repeat(35000);

    const result = validateUrl(longUrl, { skip: true });
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it("should return errors without throwing when throwOnError is false", () => {
    const longUrl =
      "https://org.crm.dynamics.com/api/data/v9.2/accounts?$filter=" + "x".repeat(35000);

    const result = validateUrl(longUrl, { throwOnError: false });
    expect(result.valid).toBe(false);
    // Both total URL length and segment length will exceed limits
    expect(result.errors.length).toBeGreaterThanOrEqual(1);
    expect(result.errors[0]).toContain("URL exceeds maximum length");
  });

  it("should report correct lengths in validation result", () => {
    const url = "https://org.crm.dynamics.com/api/data/v9.2/accounts?$select=name";
    const result = validateUrl(url);

    expect(result.totalLength).toBe(url.length);
    expect(result.maxSegmentLength).toBeGreaterThan(0);
  });

  it("should handle URLs with multiple segments", () => {
    const url =
      "https://org.crm.dynamics.com/api/data/v9.2/accounts(guid)/contact_customer_accounts";
    const result = validateUrl(url);

    expect(result.valid).toBe(true);
    expect(result.maxSegmentLength).toBeLessThan(URL_LIMITS.MAX_SEGMENT_LENGTH);
  });

  it("should throw DataverseUrlError with correct properties", () => {
    const longUrl =
      "https://org.crm.dynamics.com/api/data/v9.2/accounts?$filter=" + "x".repeat(35000);

    try {
      validateUrl(longUrl);
      expect.fail("Should have thrown");
    } catch (error) {
      expect(error).toBeInstanceOf(DataverseUrlError);
      if (error instanceof DataverseUrlError) {
        expect(error.actualLength).toBeGreaterThan(URL_LIMITS.MAX_URL_LENGTH);
        expect(error.maxLength).toBe(URL_LIMITS.MAX_URL_LENGTH);
        expect(error.url).toBe(longUrl);
        expect(error.status).toBe(400);
      }
    }
  });
});
