import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { QueryBase } from "./types/index.js";

/**
 * QueryExpressionToFetchXml request message
 *
 * Web API Action: QueryExpressionToFetchXml
 */
export class QueryExpressionToFetchXmlRequest
  extends OrganizationRequest
  implements Executable<QueryExpressionToFetchXmlResponse>
{
  constructor(public query: QueryBase) {
    super("QueryExpressionToFetchXml");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/QueryExpressionToFetchXml`;

    const body: Record<string, unknown> = {
      Query: this.query,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<QueryExpressionToFetchXmlResponse> {
    const data = await response.json();
    return QueryExpressionToFetchXmlResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Query: this.query,
    };
  }
}

/**
 * QueryExpressionToFetchXml response message
 */
export class QueryExpressionToFetchXmlResponse extends OrganizationResponse {
  constructor(public result: QueryExpressionToFetchXmlResponse) {
    super("QueryExpressionToFetchXml");
  }

  static fromResponse(data: unknown): QueryExpressionToFetchXmlResponse {
    return new QueryExpressionToFetchXmlResponse((data as any).value);
  }
}
