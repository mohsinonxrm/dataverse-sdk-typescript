import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * DeleteFlowMachineGroup request message
 *
 * Web API Action: DeleteFlowMachineGroup
 *
 * The first argument is the id of the flowmachinegroup record to call it on.
 */
export class DeleteFlowMachineGroupRequest
  extends OrganizationRequest
  implements Executable<DeleteFlowMachineGroupResponse>
{
  constructor(public flowmachinegroupId: string) {
    super("DeleteFlowMachineGroup");
  }

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

  parseResponse(_response: Response): Promise<DeleteFlowMachineGroupResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new DeleteFlowMachineGroupResponse());
  }
}

/**
 * DeleteFlowMachineGroup response message
 */
export class DeleteFlowMachineGroupResponse extends OrganizationResponse {
  constructor() {
    super("DeleteFlowMachineGroup");
  }

  static fromResponse(_data?: unknown): DeleteFlowMachineGroupResponse {
    return new DeleteFlowMachineGroupResponse();
  }
}
