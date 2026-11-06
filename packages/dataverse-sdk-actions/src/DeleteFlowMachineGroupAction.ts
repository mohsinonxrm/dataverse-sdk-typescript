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
 *
 * The first argument is the id of the flowmachinegroup record to call it on.
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
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<DeleteFlowMachineGroupResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as DeleteFlowMachineGroupResponse;
  }
}
