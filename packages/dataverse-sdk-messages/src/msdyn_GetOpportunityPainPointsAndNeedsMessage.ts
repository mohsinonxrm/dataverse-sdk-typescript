import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetOpportunityPainPointsAndNeeds message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetOpportunityPainPointsAndNeedsRequestParameters {
  msdyn_OpportunityId: string;
}

/**
 * msdyn_GetOpportunityPainPointsAndNeeds request message
 *
 * Web API Action: msdyn_GetOpportunityPainPointsAndNeeds
 */
export class msdyn_GetOpportunityPainPointsAndNeedsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetOpportunityPainPointsAndNeedsResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetOpportunityPainPointsAndNeedsRequestParameters>;

  constructor(parameters: msdyn_GetOpportunityPainPointsAndNeedsRequestParameters) {
    super("msdyn_GetOpportunityPainPointsAndNeeds", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetOpportunityPainPointsAndNeeds`;

    const body = requestBody({
      msdyn_OpportunityId: this.Parameters.msdyn_OpportunityId,
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

  async parseResponse(response: Response): Promise<msdyn_GetOpportunityPainPointsAndNeedsResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetOpportunityPainPointsAndNeedsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetOpportunityPainPointsAndNeeds action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetOpportunityPainPointsAndNeedsResult {
  "@odata.context"?: string;
  ErrorMessage: string;
  IsSuccess: boolean;
  Result: string;
}

/**
 * msdyn_GetOpportunityPainPointsAndNeeds response message
 *
 * `result` is the value the msdyn_GetOpportunityPainPointsAndNeeds action returns (see {@link msdyn_GetOpportunityPainPointsAndNeedsResult}).
 */
export class msdyn_GetOpportunityPainPointsAndNeedsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetOpportunityPainPointsAndNeedsResult) {
    super("msdyn_GetOpportunityPainPointsAndNeeds");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetOpportunityPainPointsAndNeedsResponse {
    return new msdyn_GetOpportunityPainPointsAndNeedsResponse(
      data as msdyn_GetOpportunityPainPointsAndNeedsResult
    );
  }
}
