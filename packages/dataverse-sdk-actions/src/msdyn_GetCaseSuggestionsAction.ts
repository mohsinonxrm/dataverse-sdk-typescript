import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_GetCaseSuggestions action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetCaseSuggestionsResponse {
  "@odata.context"?: string;
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
    const url = `${baseUrl}/incidents(${odataLiteral.guid(this.incidentId)})/Microsoft.Dynamics.CRM.msdyn_GetCaseSuggestions`;

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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetCaseSuggestionsResponse;
  }
}
