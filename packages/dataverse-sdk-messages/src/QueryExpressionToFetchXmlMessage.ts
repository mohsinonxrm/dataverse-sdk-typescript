import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { enumBody } from "./internal/enumBody.js";
import type {
  QueryExpressionToFetchXmlResponse as QueryExpressionToFetchXmlResponseData,
  TypedQueryBase,
} from "./types/index.js";

/**
 * QueryExpressionToFetchXml request message
 *
 * Web API Action: QueryExpressionToFetchXml
 */
export class QueryExpressionToFetchXmlRequest
  extends OrganizationRequest
  implements Executable<QueryExpressionToFetchXmlResponse>
{
  constructor(public query?: TypedQueryBase) {
    super("QueryExpressionToFetchXml");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/QueryExpressionToFetchXml`;

    const body: Record<string, unknown> = {
      Query: enumBody(this.query, "QueryBase"),
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<QueryExpressionToFetchXmlResponse> {
    const data = await response.json();
    return QueryExpressionToFetchXmlResponse.fromResponse(data);
  }
}

/**
 * QueryExpressionToFetchXml response message
 */
export class QueryExpressionToFetchXmlResponse extends OrganizationResponse {
  constructor(public result: QueryExpressionToFetchXmlResponseData) {
    super("QueryExpressionToFetchXml");
  }

  static fromResponse(data: unknown): QueryExpressionToFetchXmlResponse {
    return new QueryExpressionToFetchXmlResponse(
      responseObject<QueryExpressionToFetchXmlResponseData>(data)
    );
  }
}
