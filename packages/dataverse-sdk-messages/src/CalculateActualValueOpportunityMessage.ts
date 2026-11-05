import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
    const url = `${baseUrl}/opportunitys(${this.opportunityId})/Microsoft.Dynamics.CRM.CalculateActualValueOpportunity`;

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

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.opportunityId,
    };
  }
}

/**
 * CalculateActualValueOpportunity response message
 */
export class CalculateActualValueOpportunityResponse extends OrganizationResponse {
  constructor(public result: CalculateActualValueOpportunityResponse) {
    super("CalculateActualValueOpportunity");
  }

  static fromResponse(data: unknown): CalculateActualValueOpportunityResponse {
    return new CalculateActualValueOpportunityResponse((data as any).value);
  }
}
