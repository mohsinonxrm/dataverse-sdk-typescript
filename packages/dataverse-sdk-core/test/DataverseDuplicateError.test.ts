import { describe, it, expect } from "vitest";
import { DataverseDuplicateError } from "../src/errors/DataverseDuplicateError.js";

describe("DataverseDuplicateError", () => {
  it("should create error with duplicates", () => {
    const duplicates = [
      {
        "@odata.id": "accounts(guid1)",
        "@odata.type": "Microsoft.Dynamics.CRM.account",
        name: "Contoso",
      },
      {
        "@odata.id": "accounts(guid2)",
        "@odata.type": "Microsoft.Dynamics.CRM.account",
        name: "Contoso Ltd",
      },
    ];

    const error = new DataverseDuplicateError("Duplicates found", duplicates, "rule-guid", 412);

    expect(error.name).toBe("DataverseDuplicateError");
    expect(error.message).toBe("Duplicates found");
    expect(error.duplicates).toHaveLength(2);
    expect(error.duplicates[0]).toHaveProperty("name", "Contoso");
    expect(error.duplicateRuleId).toBe("rule-guid");
    expect(error.status).toBe(412);
  });

  it("should default to 412 status code", () => {
    const error = new DataverseDuplicateError("Duplicates found", []);

    expect(error.status).toBe(412);
  });

  it("should handle empty duplicates array", () => {
    const error = new DataverseDuplicateError("Duplicates found", []);

    expect(error.duplicates).toHaveLength(0);
  });

  it("should handle missing duplicate rule id", () => {
    const error = new DataverseDuplicateError("Duplicates found", []);

    expect(error.duplicateRuleId).toBeUndefined();
  });
});
