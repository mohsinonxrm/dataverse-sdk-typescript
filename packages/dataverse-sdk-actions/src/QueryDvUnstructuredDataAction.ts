import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from QueryDvUnstructuredData action
 */
export interface QueryDvUnstructuredDataResponse {
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as QueryDvUnstructuredDataResponse;
  }
}
