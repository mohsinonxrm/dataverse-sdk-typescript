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
    const data = await response.json();
    return data as CalculateTotalTimeIncidentResponse;
  }
}
