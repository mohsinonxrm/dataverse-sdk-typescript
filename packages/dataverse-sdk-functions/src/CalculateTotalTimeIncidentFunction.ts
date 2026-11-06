import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from CalculateTotalTimeIncident function
 */
export interface CalculateTotalTimeIncidentResponse {
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as CalculateTotalTimeIncidentResponse;
    return (await response.json()) as CalculateTotalTimeIncidentResponse;
  }
}
