import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_OptimizeCoordinatorTick action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_OptimizeCoordinatorTickResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_OptimizeCoordinatorTickResponse;
  }
}
