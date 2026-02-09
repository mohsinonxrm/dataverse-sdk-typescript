import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import type { campaignactivity } from "./types/index.js";

/**
 * AddItemCampaignActivity request message
 *
 * Web API Action: AddItemCampaignActivity
 */
export class AddItemCampaignActivityRequest
  extends OrganizationRequest
  implements Executable<AddItemCampaignActivityResponse>
{
  constructor(
    public campaignActivity: campaignactivity,
    public item: EntityReference
  ) {
    super("AddItemCampaignActivity");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/AddItemCampaignActivity`;

    const body: Record<string, unknown> = {
      CampaignActivity: this.campaignActivity,
      Item: this.item,
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

  async parseResponse(response: Response): Promise<AddItemCampaignActivityResponse> {
    const data = await response.json();
    return AddItemCampaignActivityResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      CampaignActivity: this.campaignActivity,
      Item: this.item,
    };
  }
}

/**
 * AddItemCampaignActivity response message
 */
export class AddItemCampaignActivityResponse extends OrganizationResponse {
  constructor(public result: AddItemCampaignActivityResponse) {
    super("AddItemCampaignActivity");
  }

  static fromResponse(data: unknown): AddItemCampaignActivityResponse {
    return new AddItemCampaignActivityResponse((data as any).value);
  }
}
