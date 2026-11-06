import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_StartCaseFollowupMonitoring action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_StartCaseFollowupMonitoringResponse = void;

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

  parseResponse(_response: Response): Promise<msdyn_StartCaseFollowupMonitoringResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
