import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_GetDealRiskSuggestedActionsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetDealRiskSuggestedActions action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetDealRiskSuggestedActionsResult {
  "@odata.context"?: string;
  msdyn_Response: string;
}

/**
 * msdyn_GetDealRiskSuggestedActions response message
 *
 * `result` is the value the msdyn_GetDealRiskSuggestedActions action returns (see {@link msdyn_GetDealRiskSuggestedActionsResult}).
 */
export class msdyn_GetDealRiskSuggestedActionsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetDealRiskSuggestedActionsResult) {
    super("msdyn_GetDealRiskSuggestedActions");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetDealRiskSuggestedActionsResponse {
    return new msdyn_GetDealRiskSuggestedActionsResponse(
      data as msdyn_GetDealRiskSuggestedActionsResult
    );
  }
}
