/**
 * Live tests for the generated typed functions (@mohsinonxrm/dataverse-sdk-functions).
 * See ./env.ts for configuration. These tests only read; they create nothing.
 */
import { describe, expect, it } from "vitest";
import {
  FetchXmlToQueryExpressionFunction,
  ValidateFetchXmlExpressionFunction,
} from "@mohsinonxrm/dataverse-sdk-functions";
import { live, liveClient } from "./env.js";

// Single-quoted attributes (common in FetchXML) and a condition value containing `'`.
const FETCH_XML =
  "<fetch top='1'><entity name='account'><attribute name='name'/><filter>" +
  `<condition attribute='name' operator='eq' value="O'Brien &amp; Co+1 #50%"/>` +
  "</filter></entity></fetch>";

interface QueryExpressionShape {
  EntityName: string;
  Criteria: { Conditions: Array<{ AttributeName: string; Values: Array<{ Value: unknown }> }> };
}

describe.skipIf(!live)("live: generated functions", () => {
  it("#22: FetchXmlToQueryExpression accepts FetchXML that contains single quotes", async () => {
    const { client } = liveClient();
    const info = new FetchXmlToQueryExpressionFunction({
      FetchXml: FETCH_XML,
    }).toRequestInformation(client.getBaseUrl());
    const res = await client.send(info);
    expect(res.status).toBe(200);

    const body = (await res.json()) as { Query: QueryExpressionShape };
    expect(body.Query.EntityName).toBe("account");
    // The value made the round trip intact: `'` `&` `+` `#` `%` all decoded correctly.
    expect(body.Query.Criteria.Conditions).toMatchObject([
      { AttributeName: "name", Values: [{ Value: "O'Brien & Co+1 #50%" }] },
    ]);
  });

  it("#22: ValidateFetchXmlExpression accepts FetchXML that contains single quotes", async () => {
    const { client } = liveClient();
    const result = await client.execute(
      new ValidateFetchXmlExpressionFunction({ FetchXml: FETCH_XML })
    );
    expect(result).toBeTypeOf("object");
  });
});
