import { describe, it, expect } from "vitest";
import { DataverseUrlError } from "../src/errors/DataverseUrlError.js";

describe("DataverseUrlError", () => {
  it("should create error with URL details", () => {
    const url = "https://org.crm.dynamics.com/api/data/v9.2/accounts?$filter=" + "x".repeat(35000);
    const error = new DataverseUrlError("URL too long", 35000, 32768, url);

    expect(error.name).toBe("DataverseUrlError");
    expect(error.message).toBe("URL too long");
    expect(error.actualLength).toBe(35000);
    expect(error.maxLength).toBe(32768);
    expect(error.url).toBe(url);
    expect(error.status).toBe(400);
  });

  it("should extend DataverseError", () => {
    const error = new DataverseUrlError("URL too long", 35000, 32768, "http://test.com");

    expect(error).toBeInstanceOf(Error);
    expect(error.status).toBe(400);
  });
});
