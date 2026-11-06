import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import { enumBody } from "./internal/enumBody.js";
import type {
  QueryExpressionToFetchXmlResponse as QueryExpressionToFetchXmlResponseData,
  TypedQueryBase,
} from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return QueryExpressionToFetchXmlResponse.fromResponse({});
    return QueryExpressionToFetchXmlResponse.fromResponse(await response.json());
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
