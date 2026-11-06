import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_RecoverOptimizeLeases action
 */
export interface msdyn_RecoverOptimizeLeasesResponse {
  ResultJson: string;
}

/**
 * Parameters of the msdyn_RecoverOptimizeLeases action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RecoverOptimizeLeasesActionParameters {
  WorkflowRunId?: string;
  LeaseOwner?: string;
  MaxItems?: number;
}

/**
 * msdyn_RecoverOptimizeLeases action
 *
 * Unbound action
 */
export class msdyn_RecoverOptimizeLeasesAction implements Executable<msdyn_RecoverOptimizeLeasesResponse> {
  constructor(public readonly parameters: msdyn_RecoverOptimizeLeasesActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RecoverOptimizeLeases`;

    const body = requestBody({
      WorkflowRunId: this.parameters.WorkflowRunId,
      LeaseOwner: this.parameters.LeaseOwner,
      MaxItems: this.parameters.MaxItems,
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

  async parseResponse(response: Response): Promise<msdyn_RecoverOptimizeLeasesResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_RecoverOptimizeLeasesResponse;
    return (await response.json()) as msdyn_RecoverOptimizeLeasesResponse;
  }
}
