import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GetFormattedOpportunityData request message
 *
 * Web API Action: msdyn_GetFormattedOpportunityData
 */
export class msdyn_GetFormattedOpportunityDataRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetFormattedOpportunityDataResponse>
{
  constructor(public opportunityId: string) {
    super("msdyn_GetFormattedOpportunityData");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetFormattedOpportunityData`;

    const body: Record<string, unknown> = {
      OpportunityId: this.opportunityId,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetFormattedOpportunityDataResponse> {
    const data = await response.json();
    return msdyn_GetFormattedOpportunityDataResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      OpportunityId: this.opportunityId,
    };
  }
}

/**
 * msdyn_GetFormattedOpportunityData response message
 */
export class msdyn_GetFormattedOpportunityDataResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetFormattedOpportunityDataResponse) {
    super("msdyn_GetFormattedOpportunityData");
  }

  static fromResponse(data: unknown): msdyn_GetFormattedOpportunityDataResponse {
    return new msdyn_GetFormattedOpportunityDataResponse((data as any).value);
  }
}
