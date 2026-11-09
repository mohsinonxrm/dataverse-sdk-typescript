import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_TryClaimOptimizeWorkItem message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_TryClaimOptimizeWorkItemRequestParameters {
  ClaimToken: string;
  LeaseSeconds: number;
  WorkItemId: string;
  WorkflowRunId?: string;
}

/**
 * msdyn_TryClaimOptimizeWorkItem request message
 *
 * Web API Action: msdyn_TryClaimOptimizeWorkItem
 */
export class msdyn_TryClaimOptimizeWorkItemRequest
  extends OrganizationRequest
  implements Executable<msdyn_TryClaimOptimizeWorkItemResponse>
{
  declare readonly Parameters: Readonly<msdyn_TryClaimOptimizeWorkItemRequestParameters>;

  constructor(parameters: msdyn_TryClaimOptimizeWorkItemRequestParameters) {
    super("msdyn_TryClaimOptimizeWorkItem", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TryClaimOptimizeWorkItem`;

    const body = requestBody({
      ClaimToken: this.Parameters.ClaimToken,
      LeaseSeconds: this.Parameters.LeaseSeconds,
      WorkItemId: this.Parameters.WorkItemId,
      WorkflowRunId: this.Parameters.WorkflowRunId,
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
    return msdyn_TryClaimOptimizeWorkItemResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_TryClaimOptimizeWorkItem action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_TryClaimOptimizeWorkItemResult {
  "@odata.context"?: string;
  Claimed: boolean;
  DispatchJson: string;
  ResultJson: string;
}

/**
 * msdyn_TryClaimOptimizeWorkItem response message
 *
 * `result` is the value the msdyn_TryClaimOptimizeWorkItem action returns (see {@link msdyn_TryClaimOptimizeWorkItemResult}).
 */
export class msdyn_TryClaimOptimizeWorkItemResponse extends OrganizationResponse {
  constructor(public result: msdyn_TryClaimOptimizeWorkItemResult) {
    super("msdyn_TryClaimOptimizeWorkItem");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_TryClaimOptimizeWorkItemResponse {
    return new msdyn_TryClaimOptimizeWorkItemResponse(data as msdyn_TryClaimOptimizeWorkItemResult);
  }
}
