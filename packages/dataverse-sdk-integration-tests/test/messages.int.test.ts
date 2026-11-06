/**
 * Live tests for the generated messages (@mohsinonxrm/dataverse-sdk-messages), #70: a
 * complex-type return is the response body itself, not `value`. These tests only read.
 */
import { describe, expect, it } from "vitest";
import { QueryExpressionToFetchXmlRequest } from "@mohsinonxrm/dataverse-sdk-messages";
import { live, liveClient } from "./env.js";

describe.skipIf(!live)("live: generated messages (#70)", () => {
  it("QueryExpressionToFetchXmlRequest exposes FetchXml", async () => {
    const { client } = liveClient();
    const response = await client.execute(
      new QueryExpressionToFetchXmlRequest({
        "@odata.type": "Microsoft.Dynamics.CRM.QueryExpression",
        EntityName: "account",
        ColumnSet: { Columns: ["name"] },
      })
    );
    expect(response.messageName).toBe("QueryExpressionToFetchXml");
    expect(response.result.FetchXml).toContain('<entity name="account">');
    expect(response.result).not.toHaveProperty("@odata.context");
  });
});
