import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_AutonomousSQA_GetSARsAndAssociatedEmailThreadsResponse as msdyn_AutonomousSQA_GetSARsAndAssociatedEmailThreadsResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_AutonomousSQA_GetSARsAndAssociatedEmailThreadsResponse.fromResponse({});
    return msdyn_AutonomousSQA_GetSARsAndAssociatedEmailThreadsResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * msdyn_AutonomousSQA_GetSARsAndAssociatedEmailThreads response message
 */
export class msdyn_AutonomousSQA_GetSARsAndAssociatedEmailThreadsResponse extends OrganizationResponse {
  constructor(public result: msdyn_AutonomousSQA_GetSARsAndAssociatedEmailThreadsResponseData) {
    super("msdyn_AutonomousSQA_GetSARsAndAssociatedEmailThreads");
  }

  static fromResponse(data: unknown): msdyn_AutonomousSQA_GetSARsAndAssociatedEmailThreadsResponse {
    return new msdyn_AutonomousSQA_GetSARsAndAssociatedEmailThreadsResponse(
      responseObject<msdyn_AutonomousSQA_GetSARsAndAssociatedEmailThreadsResponseData>(data)
    );
  }
}
