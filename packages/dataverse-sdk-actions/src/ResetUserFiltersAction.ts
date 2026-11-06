import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from ResetUserFilters action
 */
export interface ResetUserFiltersResponse {
  // No content returned
}

/**
 * Parameters of the ResetUserFilters action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ResetUserFiltersActionParameters {
  QueryType: number;
}

/**
 * ResetUserFilters action
 *
 * Unbound action
 */
export class ResetUserFiltersAction implements Executable<ResetUserFiltersResponse> {
  constructor(public readonly parameters: ResetUserFiltersActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ResetUserFilters`;

    const body = requestBody({
      QueryType: this.parameters.QueryType,
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

  async parseResponse(response: Response): Promise<ResetUserFiltersResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as ResetUserFiltersResponse;
  }
}
