import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { campaign, campaignitem } from "./types/index.js";

/**
 * AddItemCampaign request message
 *
 * Web API Action: AddItemCampaign
 */
export class AddItemCampaign_campaignRequest
  extends OrganizationRequest
  implements Executable<AddItemCampaign_campaignResponse>
{
  constructor(
    public campaignId: string,
    public campaign: EntityReference | EntityPayload<campaign>
  ) {
    super("AddItemCampaign");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/campaigns(${this.campaignId})/Microsoft.Dynamics.CRM.AddItemCampaign`;

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

  async parseResponse(response: Response): Promise<AddItemCampaign_campaignResponse> {
    const data = await response.json();
    return AddItemCampaign_campaignResponse.fromResponse(data);
  }
}

/**
 * AddItemCampaign response message
 */
export class AddItemCampaign_campaignResponse extends OrganizationResponse {
  constructor(public result: campaignitem) {
    super("AddItemCampaign");
  }

  static fromResponse(data: unknown): AddItemCampaign_campaignResponse {
    return new AddItemCampaign_campaignResponse(responseObject<campaignitem>(data));
  }
}
