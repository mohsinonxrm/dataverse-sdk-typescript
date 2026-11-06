/**
 * Live tests for #73: a parameter declared with a base type (QueryExpressionToFetchXml's
 * `Query: QueryBase`) needs `@odata.type` to name the derived type, and complex-type properties
 * the CSDL doesn't mark `Nullable="false"` can be left out. These tests only read; they create nothing.
 * The file is type-checked, so the constructor calls below also prove that no casts are needed.
 */
import { describe, expect, it } from "vitest";
import { QueryExpressionToFetchXmlAction } from "@mohsinonxrm/dataverse-sdk-actions";
import { live, liveClient } from "./env.js";

describe.skipIf(!live)("live: @odata.type for base-typed parameters (#73)", () => {
  it("QueryExpressionToFetchXml converts a QueryExpression sent with its @odata.type", async () => {
    const { client } = liveClient();
    const result = await client.execute(
      new QueryExpressionToFetchXmlAction({
        Query: {
          "@odata.type": "Microsoft.Dynamics.CRM.QueryExpression",
          EntityName: "account",
          ColumnSet: { Columns: ["name"] },
        },
      })
    );
    expect(result.FetchXml).toContain('<entity name="account">');
    expect(result.FetchXml).toContain('<attribute name="name" />');
  });

  it("QueryExpressionToFetchXml converts a FetchExpression", async () => {
    const { client } = liveClient();
    const result = await client.execute(
      new QueryExpressionToFetchXmlAction({
        Query: {
          "@odata.type": "Microsoft.Dynamics.CRM.FetchExpression",
          Query:
            "<fetch top='1'><entity name='contact'><attribute name='fullname'/></entity></fetch>",
        },
      })
    );
    expect(result.FetchXml).toContain('<entity name="contact">');
  });

  it("without @odata.type Dataverse rejects the query (why the type requires it)", async () => {
    const { client } = liveClient();
    const res = await client.send({
      method: "POST",
      url: `${client.getBaseUrl()}/QueryExpressionToFetchXml`,
      headers: { "content-type": "application/json" },
      body: { Query: { EntityName: "account", ColumnSet: { AllColumns: true } } },
    });
    expect(res.status).toBe(400);
    expect(await res.text()).toContain("does not exist on type 'Microsoft.Dynamics.CRM.QueryBase'");
  });
});
