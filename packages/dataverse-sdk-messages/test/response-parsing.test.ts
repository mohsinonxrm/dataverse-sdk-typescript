/**
 * #70: in OData JSON only primitive and collection returns are wrapped in `value`; an entity or
 * complex-type return is the response body itself. The generated responses read `.value` for
 * everything, so `result` was always undefined for QueryExpressionToFetchXml, ExecuteWorkflow,
 * ExportSolution and 959 others.
 */
import { describe, expect, it } from "vitest";
import { createTestClient, jsonResponse } from "@mohsinonxrm/dataverse-sdk-testing";
import * as messages from "../src/index.js";
import {
  ExecuteWorkflowRequest,
  ExportSolutionRequest,
  InstantiateTemplateRequest,
  QueryExpressionToFetchXmlRequest,
} from "../src/index.js";

const WORKFLOW = "11111111-1111-1111-1111-111111111111";
const ACCOUNT = "22222222-2222-2222-2222-222222222222";

describe("#70: message responses", () => {
  it("QueryExpressionToFetchXml exposes FetchXml", async () => {
    const { client, fake } = createTestClient();
    fake.on("POST", "/QueryExpressionToFetchXml", () =>
      jsonResponse({
        "@odata.context":
          "https://contoso.crm.dynamics.com/api/data/v9.2/$metadata#Microsoft.Dynamics.CRM.QueryExpressionToFetchXmlResponse",
        FetchXml: '<fetch><entity name="account" /></fetch>',
      })
    );

    const res = await client.execute(
      new QueryExpressionToFetchXmlRequest({
        "@odata.type": "Microsoft.Dynamics.CRM.QueryExpression",
        EntityName: "account",
      })
    );

    expect(res.result.FetchXml).toBe('<fetch><entity name="account" /></fetch>');
    expect(res.result).not.toHaveProperty("@odata.context");
  });

  it("ExecuteWorkflow exposes the asyncoperation it returns", async () => {
    const { client, fake } = createTestClient();
    fake.on("POST", `/workflows(${WORKFLOW})/Microsoft.Dynamics.CRM.ExecuteWorkflow`, () =>
      jsonResponse({
        "@odata.context":
          "https://contoso.crm.dynamics.com/api/data/v9.2/$metadata#asyncoperations/$entity",
        asyncoperationid: "33333333-3333-3333-3333-333333333333",
      })
    );

    const res = await client.execute(new ExecuteWorkflowRequest(WORKFLOW, ACCOUNT, {}));

    expect(res.result.asyncoperationid).toBe("33333333-3333-3333-3333-333333333333");
  });

  it("ExportSolution exposes the exported solution file", async () => {
    const { client, fake } = createTestClient();
    fake.on("POST", "/ExportSolution", () => jsonResponse({ ExportSolutionFile: "UEsDBA==" }));
    const res = await client.execute(
      new ExportSolutionRequest(
        "Contoso",
        false,
        "",
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        {}
      )
    );

    expect(res.result.ExportSolutionFile).toBe("UEsDBA==");
  });

  it("a collection return is read from value", async () => {
    const { client, fake } = createTestClient();
    fake.on("POST", "/InstantiateTemplate", () =>
      jsonResponse({ value: [{ subject: "Welcome", description: "Hi" }] })
    );

    const res = await client.execute(new InstantiateTemplateRequest(WORKFLOW, "account", ACCOUNT));

    expect(res.result).toEqual([{ subject: "Welcome", description: "Hi" }]);
  });

  it("no generated message has the unused toRequestBody()", () => {
    const withBody = Object.entries(messages)
      .filter(([name, value]) => name.endsWith("Request") && typeof value === "function")
      .filter(([, value]) => "toRequestBody" in (value as { prototype: object }).prototype)
      .map(([name]) => name);
    expect(withBody).toEqual([]);
  });
});
