import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import { enumBody } from "./internal/enumBody.js";
import type { TypedQueryBase } from "./types/index.js";

/**
 * Response from the QueryExpressionToFetchXml action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface QueryExpressionToFetchXmlResponse {
  "@odata.context"?: string;
  FetchXml: string;
}

/**
 * Parameters of the QueryExpressionToFetchXml action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface QueryExpressionToFetchXmlActionParameters {
  Query?: TypedQueryBase;
}

/**
 * QueryExpressionToFetchXml action
 *
 * Unbound action
 */
export class QueryExpressionToFetchXmlAction implements Executable<QueryExpressionToFetchXmlResponse> {
  constructor(public readonly parameters: QueryExpressionToFetchXmlActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/QueryExpressionToFetchXml`;

    const body = requestBody({
      Query: enumBody(this.parameters.Query, "QueryBase"),
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
    return (await response.json()) as QueryExpressionToFetchXmlResponse;
  }
}
