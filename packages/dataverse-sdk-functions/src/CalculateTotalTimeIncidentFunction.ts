import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the CalculateTotalTimeIncident function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CalculateTotalTimeIncidentResponse {
  "@odata.context"?: string;
  TotalTime: number;
}

/**
 * CalculateTotalTimeIncident function
 *
 * Bound function
 * Binding parameter: entity (mscrm.incident)
 *
 * The first argument is the id of the incident record to call it on.
 */
export class CalculateTotalTimeIncidentFunction implements Executable<CalculateTotalTimeIncidentResponse> {
  constructor(public readonly incidentId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/incidents(${this.incidentId})/Microsoft.Dynamics.CRM.CalculateTotalTimeIncident`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<CalculateTotalTimeIncidentResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as CalculateTotalTimeIncidentResponse;
  }
}
