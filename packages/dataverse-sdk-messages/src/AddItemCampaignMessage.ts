import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { campaign, campaignitem } from "./types/index.js";

/**
 * AddItemCampaign request message
 *
 * Web API Action: AddItemCampaign
 */
export class AddItemCampaignRequest
  extends OrganizationRequest
  implements Executable<AddItemCampaignResponse>
{
  constructor(
    public salesliteratureId: string,
    public campaign: campaign
  ) {
    super("AddItemCampaign");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/salesliteratures(${this.salesliteratureId})/Microsoft.Dynamics.CRM.AddItemCampaign`;

    const body: Record<string, unknown> = {
      Campaign: this.campaign,
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

  async parseResponse(response: Response): Promise<AddItemCampaignResponse> {
    const data = await response.json();
    return AddItemCampaignResponse.fromResponse(data);
  }
}

/**
 * AddItemCampaign response message
 */
export class AddItemCampaignResponse extends OrganizationResponse {
  constructor(public result: campaignitem) {
    super("AddItemCampaign");
  }

  static fromResponse(data: unknown): AddItemCampaignResponse {
    return new AddItemCampaignResponse(responseObject<campaignitem>(data));
  }
}
