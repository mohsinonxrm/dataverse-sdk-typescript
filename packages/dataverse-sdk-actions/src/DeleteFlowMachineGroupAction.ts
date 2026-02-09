import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from DeleteFlowMachineGroup action
 */
export interface DeleteFlowMachineGroupResponse {
  // No content returned
}

/**
 * DeleteFlowMachineGroup action
 *
 * Bound action
 * Binding parameter: entity (mscrm.flowmachinegroup)
 */
export class DeleteFlowMachineGroupAction implements Executable<DeleteFlowMachineGroupResponse> {
  constructor(public readonly flowmachinegroupId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/flowmachinegroups(${this.flowmachinegroupId})/Microsoft.Dynamics.CRM.DeleteFlowMachineGroup`;

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<DeleteFlowMachineGroupResponse> {
    // No return value (204 No Content)
    return {};
  }
}
