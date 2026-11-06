import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_TryClaimOptimizeWorkItemResponse as msdyn_TryClaimOptimizeWorkItemResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_TryClaimOptimizeWorkItemResponse.fromResponse({});
    return msdyn_TryClaimOptimizeWorkItemResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_TryClaimOptimizeWorkItem response message
 */
export class msdyn_TryClaimOptimizeWorkItemResponse extends OrganizationResponse {
  constructor(public result: msdyn_TryClaimOptimizeWorkItemResponseData) {
    super("msdyn_TryClaimOptimizeWorkItem");
  }

  static fromResponse(data: unknown): msdyn_TryClaimOptimizeWorkItemResponse {
    return new msdyn_TryClaimOptimizeWorkItemResponse(
      responseObject<msdyn_TryClaimOptimizeWorkItemResponseData>(data)
    );
  }
}
