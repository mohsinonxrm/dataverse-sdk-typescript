import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_RetrievePersonalizationFilters action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_RetrievePersonalizationFiltersResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_RetrievePersonalizationFiltersResponse;
  }
}
