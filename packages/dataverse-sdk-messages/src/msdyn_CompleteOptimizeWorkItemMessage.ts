import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_CompleteOptimizeWorkItem message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CompleteOptimizeWorkItemRequestParameters {
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
 * msdyn_CompleteOptimizeWorkItem request message
 *
 * Web API Action: msdyn_CompleteOptimizeWorkItem
 */
export class msdyn_CompleteOptimizeWorkItemRequest
  extends OrganizationRequest
  implements Executable<msdyn_CompleteOptimizeWorkItemResponse>
{
  declare readonly Parameters: Readonly<msdyn_CompleteOptimizeWorkItemRequestParameters>;

  constructor(parameters: msdyn_CompleteOptimizeWorkItemRequestParameters) {
    super("msdyn_CompleteOptimizeWorkItem", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CompleteOptimizeWorkItem`;

    const body = requestBody({
      WorkerDurationMs: this.Parameters.WorkerDurationMs,
      WorkerOutcomeCategory: this.Parameters.WorkerOutcomeCategory,
      ClaimToken: this.Parameters.ClaimToken,
      AgentResult: this.Parameters.AgentResult,
      FailureCode: this.Parameters.FailureCode,
      WorkflowRunId: this.Parameters.WorkflowRunId,
      WorkItemId: this.Parameters.WorkItemId,
      FailureMessage: this.Parameters.FailureMessage,
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
    return msdyn_CompleteOptimizeWorkItemResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_CompleteOptimizeWorkItem action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CompleteOptimizeWorkItemResult {
  "@odata.context"?: string;
  Accepted: boolean;
  ResultJson: string;
}

/**
 * msdyn_CompleteOptimizeWorkItem response message
 *
 * `result` is the value the msdyn_CompleteOptimizeWorkItem action returns (see {@link msdyn_CompleteOptimizeWorkItemResult}).
 */
export class msdyn_CompleteOptimizeWorkItemResponse extends OrganizationResponse {
  constructor(public result: msdyn_CompleteOptimizeWorkItemResult) {
    super("msdyn_CompleteOptimizeWorkItem");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_CompleteOptimizeWorkItemResponse {
    return new msdyn_CompleteOptimizeWorkItemResponse(data as msdyn_CompleteOptimizeWorkItemResult);
  }
}
