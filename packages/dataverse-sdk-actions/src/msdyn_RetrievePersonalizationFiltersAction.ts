import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_RetrievePersonalizationFilters action
 */
export interface msdyn_RetrievePersonalizationFiltersResponse {
  Result: string;
}

/**
 * Parameters of the msdyn_RetrievePersonalizationFilters action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RetrievePersonalizationFiltersActionParameters {
  AttributesToFilter: string;
}

/**
 * msdyn_RetrievePersonalizationFilters action
 *
 * Unbound action
 */
export class msdyn_RetrievePersonalizationFiltersAction implements Executable<msdyn_RetrievePersonalizationFiltersResponse> {
  constructor(public readonly parameters: msdyn_RetrievePersonalizationFiltersActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrievePersonalizationFilters`;

    const body = requestBody({
      AttributesToFilter: this.parameters.AttributesToFilter,
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

  async parseResponse(response: Response): Promise<msdyn_RetrievePersonalizationFiltersResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_RetrievePersonalizationFiltersResponse;
  }
}
