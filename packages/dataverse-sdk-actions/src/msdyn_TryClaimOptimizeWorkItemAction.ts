import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_TryClaimOptimizeWorkItem action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_TryClaimOptimizeWorkItemResponse {
  "@odata.context"?: string;
  Claimed: boolean;
  DispatchJson: string;
  ResultJson: string;
}

/**
 * Parameters of the msdyn_TryClaimOptimizeWorkItem action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_TryClaimOptimizeWorkItemActionParameters {
  ClaimToken: string;
  LeaseSeconds: number;
  WorkItemId: string;
  WorkflowRunId?: string;
}

/**
 * msdyn_TryClaimOptimizeWorkItem action
 *
 * Unbound action
 */
export class msdyn_TryClaimOptimizeWorkItemAction implements Executable<msdyn_TryClaimOptimizeWorkItemResponse> {
  constructor(public readonly parameters: msdyn_TryClaimOptimizeWorkItemActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TryClaimOptimizeWorkItem`;

    const body = requestBody({
      ClaimToken: this.parameters.ClaimToken,
      LeaseSeconds: this.parameters.LeaseSeconds,
      WorkItemId: this.parameters.WorkItemId,
      WorkflowRunId: this.parameters.WorkflowRunId,
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

  async parseResponse(response: Response): Promise<msdyn_TryClaimOptimizeWorkItemResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_TryClaimOptimizeWorkItemResponse;
  }
}
