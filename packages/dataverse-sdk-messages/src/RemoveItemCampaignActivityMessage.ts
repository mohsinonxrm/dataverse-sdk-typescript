import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { campaignactivityitem } from "./types/index.js";

/**
 * RemoveItemCampaignActivity request message
 *
 * Web API Action: RemoveItemCampaignActivity
 */
export class RemoveItemCampaignActivityRequest
  extends OrganizationRequest
  implements Executable<RemoveItemCampaignActivityResponse>
{
  constructor(
    public campaignactivityId: string,
    public campaignActivityItem: campaignactivityitem
  ) {
    super("RemoveItemCampaignActivity");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/campaignactivities(${this.campaignactivityId})/Microsoft.Dynamics.CRM.RemoveItemCampaignActivity`;

    const body: Record<string, unknown> = {
      CampaignActivityItem: this.campaignActivityItem,
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

  async parseResponse(response: Response): Promise<RemoveItemCampaignActivityResponse> {
    // No return value (204 No Content)
    return new RemoveItemCampaignActivityResponse();
  }
}

/**
 * RemoveItemCampaignActivity response message
 */
export class RemoveItemCampaignActivityResponse extends OrganizationResponse {
  constructor() {
    super("RemoveItemCampaignActivity");
  }

  static fromResponse(_data: unknown): RemoveItemCampaignActivityResponse {
    return new RemoveItemCampaignActivityResponse();
  }
}
