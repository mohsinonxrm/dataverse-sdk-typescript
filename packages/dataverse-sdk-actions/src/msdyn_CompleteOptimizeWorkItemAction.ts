import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_CompleteOptimizeWorkItem action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CompleteOptimizeWorkItemResponse {
  "@odata.context"?: string;
  Accepted: boolean;
  ResultJson: string;
}

/**
 * Parameters of the msdyn_CompleteOptimizeWorkItem action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CompleteOptimizeWorkItemActionParameters {
  WorkerDurationMs?: number;
  WorkerOutcomeCategory?: string;
  ClaimToken: string;
  AgentResult?: string;
  FailureCode?: string;
  WorkflowRunId?: string;
  WorkItemId: string;
  FailureMessage?: string;
}

/**
 * msdyn_CompleteOptimizeWorkItem action
 *
 * Unbound action
 */
export class msdyn_CompleteOptimizeWorkItemAction implements Executable<msdyn_CompleteOptimizeWorkItemResponse> {
  constructor(public readonly parameters: msdyn_CompleteOptimizeWorkItemActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CompleteOptimizeWorkItem`;

    const body = requestBody({
      WorkerDurationMs: this.parameters.WorkerDurationMs,
      WorkerOutcomeCategory: this.parameters.WorkerOutcomeCategory,
      ClaimToken: this.parameters.ClaimToken,
      AgentResult: this.parameters.AgentResult,
      FailureCode: this.parameters.FailureCode,
      WorkflowRunId: this.parameters.WorkflowRunId,
      WorkItemId: this.parameters.WorkItemId,
      FailureMessage: this.parameters.FailureMessage,
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

  async parseResponse(response: Response): Promise<msdyn_CompleteOptimizeWorkItemResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_CompleteOptimizeWorkItemResponse;
  }
}
