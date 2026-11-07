import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the LeaveGroup action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type LeaveGroupResponse = void;

/**
 * LeaveGroup action
 *
 * Bound action
 * Binding parameter: entity (mscrm.flowmachine)
 *
 * The first argument is the id of the flowmachine record to call it on.
 */
export class LeaveGroupAction implements Executable<LeaveGroupResponse> {
  constructor(public readonly flowmachineId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/flowmachines(${this.flowmachineId})/Microsoft.Dynamics.CRM.LeaveGroup`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  parseResponse(_response: Response): Promise<LeaveGroupResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
