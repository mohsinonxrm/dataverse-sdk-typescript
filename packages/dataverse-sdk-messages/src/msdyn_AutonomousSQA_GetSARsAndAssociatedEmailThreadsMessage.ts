import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_AutonomousSQA_GetSARsAndAssociatedEmailThreads message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_AutonomousSQA_GetSARsAndAssociatedEmailThreadsRequestParameters {
  msdyn_SalesMacroAgentType: number;
  msdyn_TrackingId: string;
}

/**
 * msdyn_AutonomousSQA_GetSARsAndAssociatedEmailThreads request message
 *
 * Web API Action: msdyn_AutonomousSQA_GetSARsAndAssociatedEmailThreads
 */
export class msdyn_AutonomousSQA_GetSARsAndAssociatedEmailThreadsRequest
  extends OrganizationRequest
  implements Executable<msdyn_AutonomousSQA_GetSARsAndAssociatedEmailThreadsResponse>
{
  declare readonly Parameters: Readonly<msdyn_AutonomousSQA_GetSARsAndAssociatedEmailThreadsRequestParameters>;

  constructor(parameters: msdyn_AutonomousSQA_GetSARsAndAssociatedEmailThreadsRequestParameters) {
    super("msdyn_AutonomousSQA_GetSARsAndAssociatedEmailThreads", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AutonomousSQA_GetSARsAndAssociatedEmailThreads`;

    const body = requestBody({
      msdyn_SalesMacroAgentType: this.Parameters.msdyn_SalesMacroAgentType,
      msdyn_TrackingId: this.Parameters.msdyn_TrackingId,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_AutonomousSQA_GetSARsAndAssociatedEmailThreadsResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_AutonomousSQA_GetSARsAndAssociatedEmailThreadsResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_AutonomousSQA_GetSARsAndAssociatedEmailThreads action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_AutonomousSQA_GetSARsAndAssociatedEmailThreadsResult {
  "@odata.context"?: string;
  msdyn_OrgUrl: string;
  msdyn_response: string;
}

/**
 * msdyn_AutonomousSQA_GetSARsAndAssociatedEmailThreads response message
 *
 * `result` is the value the msdyn_AutonomousSQA_GetSARsAndAssociatedEmailThreads action returns (see {@link msdyn_AutonomousSQA_GetSARsAndAssociatedEmailThreadsResult}).
 */
export class msdyn_AutonomousSQA_GetSARsAndAssociatedEmailThreadsResponse extends OrganizationResponse {
  constructor(public result: msdyn_AutonomousSQA_GetSARsAndAssociatedEmailThreadsResult) {
    super("msdyn_AutonomousSQA_GetSARsAndAssociatedEmailThreads");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_AutonomousSQA_GetSARsAndAssociatedEmailThreadsResponse {
    return new msdyn_AutonomousSQA_GetSARsAndAssociatedEmailThreadsResponse(
      data as msdyn_AutonomousSQA_GetSARsAndAssociatedEmailThreadsResult
    );
  }
}
