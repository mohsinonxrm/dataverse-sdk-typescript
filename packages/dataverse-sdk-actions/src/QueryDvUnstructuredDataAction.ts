import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the QueryDvUnstructuredData action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface QueryDvUnstructuredDataResponse {
  "@odata.context"?: string;
  knowledgePluginResponse: string;
}

/**
 * Parameters of the QueryDvUnstructuredData action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface QueryDvUnstructuredDataActionParameters {
  userQueryText?: string;
}

/**
 * QueryDvUnstructuredData action
 *
 * Unbound action
 */
export class QueryDvUnstructuredDataAction implements Executable<QueryDvUnstructuredDataResponse> {
  constructor(public readonly parameters: QueryDvUnstructuredDataActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/QueryDvUnstructuredData`;

    const body = requestBody({
      userQueryText: this.parameters.userQueryText,
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

  async parseResponse(response: Response): Promise<QueryDvUnstructuredDataResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as QueryDvUnstructuredDataResponse;
  }
}
