import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import { enumBody } from "./internal/enumBody.js";
import type { TypedQueryBase } from "./types/index.js";

/**
 * Parameters of the QueryExpressionToFetchXml message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface QueryExpressionToFetchXmlRequestParameters {
  Query?: TypedQueryBase;
}

/**
 * QueryExpressionToFetchXml request message
 *
 * Web API Action: QueryExpressionToFetchXml
 */
export class QueryExpressionToFetchXmlRequest
  extends OrganizationRequest
  implements Executable<QueryExpressionToFetchXmlResponse>
{
  declare readonly Parameters: Readonly<QueryExpressionToFetchXmlRequestParameters>;

  constructor(parameters: QueryExpressionToFetchXmlRequestParameters = {}) {
    super("QueryExpressionToFetchXml", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/QueryExpressionToFetchXml`;

    const body = requestBody({
      Query: enumBody(this.Parameters.Query, "QueryBase"),
    });

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
    // The body is the complex value, with its @odata.context
    return QueryExpressionToFetchXmlResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the QueryExpressionToFetchXml action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface QueryExpressionToFetchXmlResult {
  "@odata.context"?: string;
  FetchXml: string;
}

/**
 * QueryExpressionToFetchXml response message
 *
 * `result` is the value the QueryExpressionToFetchXml action returns (see {@link QueryExpressionToFetchXmlResult}).
 */
export class QueryExpressionToFetchXmlResponse extends OrganizationResponse {
  constructor(public result: QueryExpressionToFetchXmlResult) {
    super("QueryExpressionToFetchXml");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): QueryExpressionToFetchXmlResponse {
    return new QueryExpressionToFetchXmlResponse(data as QueryExpressionToFetchXmlResult);
  }
}
