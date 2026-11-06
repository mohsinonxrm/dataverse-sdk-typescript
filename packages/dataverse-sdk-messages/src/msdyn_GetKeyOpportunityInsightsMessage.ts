import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetKeyOpportunityInsights message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetKeyOpportunityInsightsRequestParameters {
  msdyn_OpportunityId: string;
}

/**
 * msdyn_GetKeyOpportunityInsights request message
 *
 * Web API Action: msdyn_GetKeyOpportunityInsights
 */
export class msdyn_GetKeyOpportunityInsightsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetKeyOpportunityInsightsResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetKeyOpportunityInsightsRequestParameters>;

  constructor(parameters: msdyn_GetKeyOpportunityInsightsRequestParameters) {
    super("msdyn_GetKeyOpportunityInsights", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetKeyOpportunityInsights`;

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

  async parseResponse(response: Response): Promise<msdyn_GetKeyOpportunityInsightsResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetKeyOpportunityInsightsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetKeyOpportunityInsights action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetKeyOpportunityInsightsResult {
  "@odata.context"?: string;
  ErrorMessage: string;
  IsSuccess: boolean;
  Result: string;
}

/**
 * msdyn_GetKeyOpportunityInsights response message
 *
 * `result` is the value the msdyn_GetKeyOpportunityInsights action returns (see {@link msdyn_GetKeyOpportunityInsightsResult}).
 */
export class msdyn_GetKeyOpportunityInsightsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetKeyOpportunityInsightsResult) {
    super("msdyn_GetKeyOpportunityInsights");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetKeyOpportunityInsightsResponse {
    return new msdyn_GetKeyOpportunityInsightsResponse(
      data as msdyn_GetKeyOpportunityInsightsResult
    );
  }
}
