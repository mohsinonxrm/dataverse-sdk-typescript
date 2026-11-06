import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the RemoveFlowFromFlowGroup action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type RemoveFlowFromFlowGroupResponse = void;

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

  parseResponse(_response: Response): Promise<RemoveFlowFromFlowGroupResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
