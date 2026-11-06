import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_OptimizeCoordinatorTick action
 */
export interface msdyn_OptimizeCoordinatorTickResponse {
  ResultJson: string;
}

/**
 * Parameters of the msdyn_OptimizeCoordinatorTick action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_OptimizeCoordinatorTickActionParameters {
  WorkflowRunId?: string;
  LeaseOwner?: string;
}

/**
 * msdyn_OptimizeCoordinatorTick action
 *
 * Unbound action
 */
export class msdyn_OptimizeCoordinatorTickAction implements Executable<msdyn_OptimizeCoordinatorTickResponse> {
  constructor(public readonly parameters: msdyn_OptimizeCoordinatorTickActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_OptimizeCoordinatorTick`;

    const body = requestBody({
      WorkflowRunId: this.parameters.WorkflowRunId,
      LeaseOwner: this.parameters.LeaseOwner,
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

  async parseResponse(response: Response): Promise<msdyn_OptimizeCoordinatorTickResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_OptimizeCoordinatorTickResponse;
    return (await response.json()) as msdyn_OptimizeCoordinatorTickResponse;
  }
}
