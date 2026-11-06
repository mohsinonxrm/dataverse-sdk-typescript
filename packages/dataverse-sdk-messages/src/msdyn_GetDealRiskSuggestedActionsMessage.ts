import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetDealRiskSuggestedActionsResponse as msdyn_GetDealRiskSuggestedActionsResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetDealRiskSuggestedActions message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetDealRiskSuggestedActionsRequestParameters {
  msdyn_Context?: string;
  msdyn_TrackingId: string;
  msdyn_TopCount: number;
}

/**
 * msdyn_GetDealRiskSuggestedActions request message
 *
 * Web API Action: msdyn_GetDealRiskSuggestedActions
 */
export class msdyn_GetDealRiskSuggestedActionsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetDealRiskSuggestedActionsResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetDealRiskSuggestedActionsRequestParameters>;

  constructor(parameters: msdyn_GetDealRiskSuggestedActionsRequestParameters) {
    super("msdyn_GetDealRiskSuggestedActions", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetDealRiskSuggestedActions`;

    const body = requestBody({
      msdyn_Context: this.Parameters.msdyn_Context,
      msdyn_TrackingId: this.Parameters.msdyn_TrackingId,
      msdyn_TopCount: this.Parameters.msdyn_TopCount,
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

  async parseResponse(response: Response): Promise<msdyn_GetDealRiskSuggestedActionsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_GetDealRiskSuggestedActionsResponse.fromResponse({});
    return msdyn_GetDealRiskSuggestedActionsResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GetDealRiskSuggestedActions response message
 */
export class msdyn_GetDealRiskSuggestedActionsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetDealRiskSuggestedActionsResponseData) {
    super("msdyn_GetDealRiskSuggestedActions");
  }

  static fromResponse(data: unknown): msdyn_GetDealRiskSuggestedActionsResponse {
    return new msdyn_GetDealRiskSuggestedActionsResponse(
      responseObject<msdyn_GetDealRiskSuggestedActionsResponseData>(data)
    );
  }
}
