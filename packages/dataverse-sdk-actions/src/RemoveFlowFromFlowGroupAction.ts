import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from RemoveFlowFromFlowGroup action
 */
export interface RemoveFlowFromFlowGroupResponse {
  // No content returned
}

/**
 * Parameters of the RemoveFlowFromFlowGroup action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RemoveFlowFromFlowGroupActionParameters {
  workflowId: string;
}

/**
 * RemoveFlowFromFlowGroup action
 *
 * Bound action
 * Binding parameter: entity (mscrm.flowgroup)
 *
 * The first argument is the id of the flowgroup record to call it on.
 */
export class RemoveFlowFromFlowGroupAction implements Executable<RemoveFlowFromFlowGroupResponse> {
  constructor(
    public readonly flowgroupId: string,
    public readonly parameters: RemoveFlowFromFlowGroupActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/flowgroups(${this.flowgroupId})/Microsoft.Dynamics.CRM.RemoveFlowFromFlowGroup`;

    const body = requestBody({
      workflowId: this.parameters.workflowId,
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

  async parseResponse(response: Response): Promise<RemoveFlowFromFlowGroupResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as RemoveFlowFromFlowGroupResponse;
    return (await response.json()) as RemoveFlowFromFlowGroupResponse;
  }
}
