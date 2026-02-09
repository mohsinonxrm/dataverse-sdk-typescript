import { describe, it, expect } from "vitest";
import { WhoAmIFunction } from "../src/WhoAmIFunction.js";

describe("WhoAmIFunction", () => {
  describe("toRequestInformation", () => {
    it("should create GET request to /WhoAmI", () => {
      const func = new WhoAmIFunction();
      const baseUrl = "https://org.crm.dynamics.com/api/data/v9.2";

      const requestInfo = func.toRequestInformation(baseUrl);

      expect(requestInfo.method).toBe("GET");
      expect(requestInfo.url).toBe("https://org.crm.dynamics.com/api/data/v9.2/WhoAmI");
    });
  });

  describe("parseResponse", () => {
    it("should parse WhoAmI response correctly", async () => {
      const func = new WhoAmIFunction();
      const mockResponse = new Response(
        JSON.stringify({
          UserId: "00000000-0000-0000-0000-000000000001",
          BusinessUnitId: "00000000-0000-0000-0000-000000000002",
          OrganizationId: "00000000-0000-0000-0000-000000000003",
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );

      const response = await func.parseResponse(mockResponse);

      expect(response.UserId).toBe("00000000-0000-0000-0000-000000000001");
      expect(response.BusinessUnitId).toBe("00000000-0000-0000-0000-000000000002");
      expect(response.OrganizationId).toBe("00000000-0000-0000-0000-000000000003");
    });
  });
});
