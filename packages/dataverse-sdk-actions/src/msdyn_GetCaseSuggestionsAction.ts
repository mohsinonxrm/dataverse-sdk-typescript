import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetCaseSuggestions action
 */
export interface msdyn_GetCaseSuggestionsResponse {
  Result: string;
}

/**
 * msdyn_GetCaseSuggestions action
 *
 * Bound action
 * Binding parameter: entity (mscrm.incident)
 */
export class msdyn_GetCaseSuggestionsAction implements Executable<msdyn_GetCaseSuggestionsResponse> {
  constructor(
    public readonly incidentId: string,
    public readonly count: number
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/incidents(${this.incidentId})/Microsoft.Dynamics.CRM.msdyn_GetCaseSuggestions`;

    const body: Record<string, unknown> = {
      Count: this.count,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetCaseSuggestionsResponse> {
    const data = await response.json();
    return data as msdyn_GetCaseSuggestionsResponse;
  }
}
