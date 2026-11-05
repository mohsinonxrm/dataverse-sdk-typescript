import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetFormattedOpportunityDataResponse as msdyn_GetFormattedOpportunityDataResponseData } from "./types/index.js";

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetFormattedOpportunityDataResponse> {
    const data = await response.json();
    return msdyn_GetFormattedOpportunityDataResponse.fromResponse(data);
  }
}

/**
 * msdyn_GetFormattedOpportunityData response message
 */
export class msdyn_GetFormattedOpportunityDataResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetFormattedOpportunityDataResponseData) {
    super("msdyn_GetFormattedOpportunityData");
  }

  static fromResponse(data: unknown): msdyn_GetFormattedOpportunityDataResponse {
    return new msdyn_GetFormattedOpportunityDataResponse(
      responseObject<msdyn_GetFormattedOpportunityDataResponseData>(data)
    );
  }
}
