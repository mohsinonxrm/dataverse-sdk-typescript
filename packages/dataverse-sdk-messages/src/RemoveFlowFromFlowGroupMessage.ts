import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the RemoveFlowFromFlowGroup message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RemoveFlowFromFlowGroupRequestParameters {
  workflowId: string;
}

/**
 * RemoveFlowFromFlowGroup request message
 *
 * Web API Action: RemoveFlowFromFlowGroup
 *
 * The first argument is the id of the flowgroup record to call it on.
 */
export class RemoveFlowFromFlowGroupRequest
  extends OrganizationRequest
  implements Executable<RemoveFlowFromFlowGroupResponse>
{
  declare readonly Parameters: Readonly<RemoveFlowFromFlowGroupRequestParameters>;

  constructor(
    public flowgroupId: string,
    parameters: RemoveFlowFromFlowGroupRequestParameters
  ) {
    super("RemoveFlowFromFlowGroup", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/flowgroups(${odataLiteral.guid(this.flowgroupId)})/Microsoft.Dynamics.CRM.RemoveFlowFromFlowGroup`;

    const body = requestBody({
      workflowId: this.Parameters.workflowId,
    });

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  parseResponse(_response: Response): Promise<RemoveFlowFromFlowGroupResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new RemoveFlowFromFlowGroupResponse());
  }
}

/**
 * RemoveFlowFromFlowGroup response message
 */
export class RemoveFlowFromFlowGroupResponse extends OrganizationResponse {
  constructor() {
    super("RemoveFlowFromFlowGroup");
  }

  static fromResponse(_data?: unknown): RemoveFlowFromFlowGroupResponse {
    return new RemoveFlowFromFlowGroupResponse();
  }
}
