import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { campaignresponse } from "./types/index.js";

/**
 * CopyCampaignResponse request message
 *
 * Web API Action: CopyCampaignResponse
 *
 * The first argument is the id of the campaignresponse record to call it on.
 */
export class CopyCampaignResponseRequest
  extends OrganizationRequest
  implements Executable<CopyCampaignResponseResponse>
{
  constructor(public campaignresponseId: string) {
    super("CopyCampaignResponse");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/campaignresponses(${this.campaignresponseId})/Microsoft.Dynamics.CRM.CopyCampaignResponse`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<CopyCampaignResponseResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return CopyCampaignResponseResponse.fromResponse({});
    return CopyCampaignResponseResponse.fromResponse(await response.json());
  }
}

/**
 * CopyCampaignResponse response message
 */
export class CopyCampaignResponseResponse extends OrganizationResponse {
  constructor(public result: campaignresponse) {
    super("CopyCampaignResponse");
  }

  static fromResponse(data: unknown): CopyCampaignResponseResponse {
    return new CopyCampaignResponseResponse(responseObject<campaignresponse>(data));
  }
}
