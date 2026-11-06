import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { CalculateActualValueOpportunityResponse as CalculateActualValueOpportunityResponseData } from "./types/index.js";

/**
 * CalculateActualValueOpportunity request message
 *
 * Web API Action: CalculateActualValueOpportunity
 *
 * The first argument is the id of the opportunity record to call it on.
 */
export class CalculateActualValueOpportunityRequest
  extends OrganizationRequest
  implements Executable<CalculateActualValueOpportunityResponse>
{
  constructor(public opportunityId: string) {
    super("CalculateActualValueOpportunity");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/opportunities(${this.opportunityId})/Microsoft.Dynamics.CRM.CalculateActualValueOpportunity`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<CalculateActualValueOpportunityResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return CalculateActualValueOpportunityResponse.fromResponse({});
    return CalculateActualValueOpportunityResponse.fromResponse(await response.json());
  }
}

/**
 * CalculateActualValueOpportunity response message
 */
export class CalculateActualValueOpportunityResponse extends OrganizationResponse {
  constructor(public result: CalculateActualValueOpportunityResponseData) {
    super("CalculateActualValueOpportunity");
  }

  static fromResponse(data: unknown): CalculateActualValueOpportunityResponse {
    return new CalculateActualValueOpportunityResponse(
      responseObject<CalculateActualValueOpportunityResponseData>(data)
    );
  }
}
