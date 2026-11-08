/**
 * #344: messages backed by Web API functions: `WhoAmIRequest`, `RetrieveEntityRequest`, the bound
 * `RetrievePrincipalAccess_<table>Request` overloads. Each sends the same `GET` as the functions
 * package's class and resolves the function's value in `response.result`.
 */
import { describe, expect, it } from "vitest";
import { TEST_API_URL, createTestClient, jsonResponse } from "@mohsinonxrm/dataverse-sdk-testing";
import {
  EntityFilters,
  OrganizationRequest,
  RetrieveEntityRequest,
  RetrieveEntityResponse,
  RetrievePrincipalAccess_systemuserRequest,
  WhoAmIRequest,
  WhoAmIResponse,
  createEntityReference,
} from "../src/index.js";

const U1 = "00000000-0000-0000-0000-0000000000a1";
const A1 = "00000000-0000-0000-0000-0000000000b1";

describe("function-backed messages (#344)", () => {
  it("WhoAmIRequest sends GET /WhoAmI and resolves the WhoAmI value in result", async () => {
    const { client, fake } = createTestClient();
    const body = { UserId: U1, BusinessUnitId: A1, OrganizationId: A1 };
    fake.on("GET", "/WhoAmI", () => jsonResponse(body));
    const request = new WhoAmIRequest();
    expect(request).toBeInstanceOf(OrganizationRequest);
    expect(request.messageName).toBe("WhoAmI");
    expect(request.Parameters).toEqual({});

    const response = await client.execute(request);
    expect(fake.last().method).toBe("GET");
    expect(response).toBeInstanceOf(WhoAmIResponse);
    expect(response.messageName).toBe("WhoAmI");
    expect(response.result.UserId).toBe(U1);
    expect(request.toRequestInformation(TEST_API_URL)).toEqual({
      method: "GET",
      url: `${TEST_API_URL}/WhoAmI`,
      headers: { Accept: "application/json" },
    });
  });

  it("RetrieveEntityRequest sends the parameter aliases of the RetrieveEntity function", async () => {
    const parameters = {
      EntityFilters: EntityFilters.Attributes,
      LogicalName: "account",
      MetadataId: "00000000-0000-0000-0000-000000000000",
      RetrieveAsIfPublished: false,
    };
    const request = new RetrieveEntityRequest(parameters);
    expect(request.Parameters).toEqual(parameters);
    const info = request.toRequestInformation(TEST_API_URL);
    expect(info.method).toBe("GET");
    // As the functions package's RetrieveEntityFunction sends it
    expect(decodeURIComponent(info.url)).toBe(
      `${TEST_API_URL}/RetrieveEntity(EntityFilters=@p1,LogicalName=@p2,MetadataId=@p3,RetrieveAsIfPublished=@p4)` +
        `?@p1=Microsoft.Dynamics.CRM.EntityFilters'2'&@p2='account'&@p3=${parameters.MetadataId}&@p4=false`
    );

    const { client, fake } = createTestClient();
    fake.on("GET", /^\/RetrieveEntity\(/, () =>
      jsonResponse({ EntityMetadata: { LogicalName: "account" } })
    );
    const response = await client.execute(request);
    expect(response).toBeInstanceOf(RetrieveEntityResponse);
    expect(response.result.EntityMetadata.LogicalName).toBe("account");
  });

  it("a bound function's message takes the record id first", () => {
    const info = new RetrievePrincipalAccess_systemuserRequest(`{${U1}}`, {
      Target: createEntityReference("account", A1),
    }).toRequestInformation(TEST_API_URL);
    expect(decodeURIComponent(info.url)).toBe(
      `${TEST_API_URL}/systemusers(${U1})/Microsoft.Dynamics.CRM.RetrievePrincipalAccess(Target=@p1)` +
        `?@p1={"@odata.id":"accounts(${A1})"}`
    );
  });
});
