import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the DeleteFlowMachineGroup action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type DeleteFlowMachineGroupResponse = void;

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
    const url = `${baseUrl}/flowmachinegroups(${odataLiteral.guid(this.flowmachinegroupId)})/Microsoft.Dynamics.CRM.DeleteFlowMachineGroup`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  parseResponse(_response: Response): Promise<DeleteFlowMachineGroupResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
