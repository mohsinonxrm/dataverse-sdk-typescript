import { describe, it, expect, beforeEach } from "vitest";
import { DataverseClient } from "../src/client/DataverseClient.js";
import { DataverseDuplicateError } from "../src/errors/DataverseDuplicateError.js";
import { DataverseUrlError } from "../src/errors/DataverseUrlError.js";

describe("DataverseRequestBuilder - Fluent API Enhancements", () => {
  let client: DataverseClient;

  beforeEach(() => {
    client = new DataverseClient({
      baseUrl: "https://test.crm.dynamics.com",
      tokenProvider: () => Promise.resolve({ token: "test-token", expiresOn: new Date() }),
    });
  });

  describe("Prefer Fluent API", () => {
    it("should support fluent prefer builder", () => {
      const builder = client.api("/accounts");
      const preferBuilder = builder.prefer();

      expect(preferBuilder).toBeDefined();
      expect(typeof preferBuilder.returnRepresentation).toBe("function");
      expect(typeof preferBuilder.formattedValues).toBe("function");
    });

    it("should still support array-based prefer", () => {
      const builder = client.api("/accounts");
      builder.prefer(["return=representation"]);

      // Should return builder for chaining
      expect(builder).toBeDefined();
    });
  });

  describe("ETag Fluent API", () => {
    it("should support ifMatch", () => {
      const builder = client.api("/accounts(guid)");
      const result = builder.ifMatch('W/"12345"');

      expect(result).toBe(builder); // Should return this for chaining
    });

    it("should support ifNoneMatch with default value", () => {
      const builder = client.api("/accounts(guid)");
      const result = builder.ifNoneMatch();

      expect(result).toBe(builder);
    });

    it("should support ifNoneMatch with custom value", () => {
      const builder = client.api("/accounts(guid)");
      const result = builder.ifNoneMatch('W/"12345"');

      expect(result).toBe(builder);
    });

    it("should support updateOnly alias", () => {
      const builder = client.api("/accounts(guid)");
      const result = builder.updateOnly('W/"12345"');

      expect(result).toBe(builder);
    });

    it("should support createOnly alias", () => {
      const builder = client.api("/accounts(guid)");
      const result = builder.createOnly();

      expect(result).toBe(builder);
    });
  });

  describe("Duplicate Detection API", () => {
    it("should support detectDuplicates", () => {
      const builder = client.api("/accounts");
      const result = builder.detectDuplicates();

      expect(result).toBe(builder);
    });

    it("should export DataverseDuplicateError", () => {
      expect(DataverseDuplicateError).toBeDefined();

      const error = new DataverseDuplicateError("Test", [], "rule-guid");
      expect(error).toBeInstanceOf(Error);
      expect(error.name).toBe("DataverseDuplicateError");
    });
  });

  describe("Binding Fluent API", () => {
    it("should support bind on DataverseClient", () => {
      const payload = client.bind("parentcustomerid_account", "accounts", "parent-guid");

      expect(payload).toEqual({
        "parentcustomerid_account@odata.bind": "/accounts(parent-guid)",
      });
    });

    it("should support bind on DataverseRequestBuilder", () => {
      const builder = client.api("/contacts");
      const result = builder.bind("parentcustomerid_account", "accounts", "parent-guid");

      expect(result).toBe(builder);
    });

    it("should support associate", () => {
      const builder = client.api("/accounts(guid)");

      // Method exists
      expect(typeof builder.associate).toBe("function");
    });

    it("should support disassociate", () => {
      const builder = client.api("/accounts(guid)");

      // Method exists
      expect(typeof builder.disassociate).toBe("function");
    });

    it("should support bindMany", () => {
      const builder = client.api("/accounts(guid)");

      // Method exists
      expect(typeof builder.bindMany).toBe("function");
    });
  });

  describe("URL Validation", () => {
    it("should support skipUrlValidation", () => {
      const builder = client.api("/accounts");
      const result = builder.skipUrlValidation();

      expect(result).toBe(builder);
    });

    it("should export DataverseUrlError", () => {
      expect(DataverseUrlError).toBeDefined();

      const error = new DataverseUrlError("Test", 35000, 32768, "http://test.com");
      expect(error).toBeInstanceOf(Error);
      expect(error.name).toBe("DataverseUrlError");
    });

    it("should validate URL by default", () => {
      const builder = client.api("/accounts");
      const longFilter = "x".repeat(35000);

      // Should throw when attempting to send with long filter
      expect(async () => {
        builder.filter(longFilter);
        await builder.get();
      }).rejects.toThrow();
    });
  });

  describe("Method Chaining", () => {
    it("should allow chaining all fluent methods", () => {
      const builder = client
        .api("/accounts")
        .select("name", "revenue")
        .filter("revenue gt 1000000")
        .top(10)
        .detectDuplicates()
        .skipUrlValidation()
        .bind("parentcustomerid_account", "accounts", "parent-guid");

      expect(builder).toBeDefined();
    });

    it("should allow prefer fluent builder in chain", () => {
      const builder = client
        .api("/accounts")
        .select("name")
        .prefer()
        .returnRepresentation()
        .formattedValues();

      expect(builder).toBeDefined();
    });
  });
});
