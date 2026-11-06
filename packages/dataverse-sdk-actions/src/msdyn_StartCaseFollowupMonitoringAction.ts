import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_StartCaseFollowupMonitoring action
 */
export interface msdyn_StartCaseFollowupMonitoringResponse {
  // No content returned
}

/**
 * msdyn_StartCaseFollowupMonitoring action
 *
 * Bound action
 * Binding parameter: entity (mscrm.incident)
 *
 * The first argument is the id of the incident record to call it on.
 */
export class msdyn_StartCaseFollowupMonitoringAction implements Executable<msdyn_StartCaseFollowupMonitoringResponse> {
  constructor(public readonly incidentId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/incidents(${this.incidentId})/Microsoft.Dynamics.CRM.msdyn_StartCaseFollowupMonitoring`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_StartCaseFollowupMonitoringResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_StartCaseFollowupMonitoringResponse;
    return (await response.json()) as msdyn_StartCaseFollowupMonitoringResponse;
  }
}
