import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetCaseSuggestions action
 */
export interface msdyn_GetCaseSuggestionsResponse {
  Result: string;
}

/**
 * Parameters of the msdyn_GetCaseSuggestions action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetCaseSuggestionsActionParameters {
  Count?: number;
}

/**
 * msdyn_GetCaseSuggestions action
 *
 * Bound action
 * Binding parameter: entity (mscrm.incident)
 *
 * The first argument is the id of the incident record to call it on.
 */
export class msdyn_GetCaseSuggestionsAction implements Executable<msdyn_GetCaseSuggestionsResponse> {
  constructor(
    public readonly incidentId: string,
    public readonly parameters: msdyn_GetCaseSuggestionsActionParameters = {}
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/incidents(${this.incidentId})/Microsoft.Dynamics.CRM.msdyn_GetCaseSuggestions`;

    const body = requestBody({
      Count: this.parameters.Count,
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

  async parseResponse(response: Response): Promise<msdyn_GetCaseSuggestionsResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_GetCaseSuggestionsResponse;
  }
}
