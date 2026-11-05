import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from LeaveGroup action
 */
export interface LeaveGroupResponse {
  // No content returned
}

/**
 * LeaveGroup action
 *
 * Bound action
 * Binding parameter: entity (mscrm.flowmachine)
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

  async parseResponse(response: Response): Promise<LeaveGroupResponse> {
    // No return value (204 No Content)
    return {};
  }
}
