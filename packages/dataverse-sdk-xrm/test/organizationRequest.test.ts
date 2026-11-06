/**
 * #80: the generic OrganizationRequest escape hatch runs through OrganizationService.execute()
 * (and client.execute()) against a real DataverseClient and a fake fetch.
 */
import { describe, it, expect } from "vitest";
import { DataverseError } from "@mohsinonxrm/dataverse-sdk-core";
import {
  OrganizationRequest,
  OrganizationResponse,
  PublishAllXmlRequest,
} from "@mohsinonxrm/dataverse-sdk-messages";
import {
  TEST_API_URL,
  createTestClient,
  jsonResponse,
  noContent,
  odataError,
} from "@mohsinonxrm/dataverse-sdk-testing";
import { OrganizationService } from "../src/index.js";

const ID = "12345678-1234-1234-1234-123456789012";

describe("#80: OrganizationRequest is executable", () => {
  it("service.execute() POSTs the parameters to the unbound action and fills Results", async () => {
    const { client, fake } = createTestClient();
    fake.on("POST", "/new_CustomAction", () =>
      jsonResponse({
        "@odata.context": `${TEST_API_URL}/$metadata#Microsoft.Dynamics.CRM.new_CustomActionResponse`,
        OutputParameter: "result",
        Count: 10,
      })
    );
    const service = new OrganizationService(client);

    const request = new OrganizationRequest("new_CustomAction", { StringParameter: "value" });
    request.Parameters.IntParameter = 42;
    const response = await service.execute<OrganizationResponse>(request);

    expect(response).toBeInstanceOf(OrganizationResponse);
    expect(response.messageName).toBe("new_CustomAction");
    expect(response.Results).toEqual({ OutputParameter: "result", Count: 10 });

    const req = fake.last();
    expect(req.method).toBe("POST");
    expect(req.headers["content-type"]).toBe("application/json");
    expect(JSON.parse(req.bodyText ?? "")).toEqual({ StringParameter: "value", IntParameter: 42 });
  });

  it("a 204 response gives empty Results, and no parameters send an empty object", async () => {
    const { client, fake } = createTestClient();
    fake.on("POST", "/new_NoOutput", () => noContent());
    const response = await client.execute(new OrganizationRequest("new_NoOutput"));
    expect(response.Results).toEqual({});
    expect(fake.last().bodyText).toBe("{}");
  });

  it("boundTo sends the action to the record with the Microsoft.Dynamics.CRM namespace", async () => {
    const { client, fake } = createTestClient();
    fake.on("POST", `/accounts(${ID})/Microsoft.Dynamics.CRM.new_BoundAction`, () =>
      jsonResponse({ Done: true })
    );
    const service = new OrganizationService(client);

    const response = await service.execute<OrganizationResponse>(
      new OrganizationRequest(
        "new_BoundAction",
        { Flag: true },
        { boundTo: { entitySetName: "accounts", id: `{${ID}}` } }
      )
    );

    expect(response.Results).toEqual({ Done: true });
    expect(fake.last().path).toBe(`/accounts(${ID})/Microsoft.Dynamics.CRM.new_BoundAction`);
  });

  it("ignores trailing slashes on the base URL", () => {
    const info = new OrganizationRequest("new_CustomAction").toRequestInformation(
      `${TEST_API_URL}///`
    );
    expect(info.url).toBe(`${TEST_API_URL}/new_CustomAction`);
  });

  it("a non-object JSON response lands in Results.value", async () => {
    const { client, fake } = createTestClient();
    fake.on("POST", "/new_ReturnsArray", () => jsonResponse([1, 2]));
    const response = await client.execute(new OrganizationRequest("new_ReturnsArray"));
    expect(response.Results).toEqual({ value: [1, 2] });
  });

  it("an error response rejects with a DataverseError", async () => {
    const { client, fake } = createTestClient();
    fake.on("POST", "/new_Missing", () =>
      odataError(404, "0x80060888", "Resource not found for the segment 'new_Missing'.")
    );
    const service = new OrganizationService(client);
    await expect(service.execute(new OrganizationRequest("new_Missing"))).rejects.toBeInstanceOf(
      DataverseError
    );
  });

  it("typed messages keep their own request and response", async () => {
    const { client, fake } = createTestClient();
    fake.on("POST", "/PublishAllXml", () => noContent());
    const service = new OrganizationService(client);
    await service.execute(new PublishAllXmlRequest());
    expect(fake.last().path).toBe("/PublishAllXml");
  });
});
