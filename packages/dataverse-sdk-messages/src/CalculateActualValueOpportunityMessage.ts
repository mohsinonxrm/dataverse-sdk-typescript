import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { CalculateActualValueOpportunityResponse as CalculateActualValueOpportunityResponseData } from "./types/index.js";

/**
 * CalculateActualValueOpportunity request message
 *
 * Web API Action: CalculateActualValueOpportunity
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
    const data = await response.json();
    return CalculateActualValueOpportunityResponse.fromResponse(data);
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
