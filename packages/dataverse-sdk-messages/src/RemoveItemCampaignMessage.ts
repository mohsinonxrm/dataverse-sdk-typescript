import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { campaignitem } from "./types/index.js";

/**
 * RemoveItemCampaign request message
 *
 * Web API Action: RemoveItemCampaign
 */
export class RemoveItemCampaignRequest
  extends OrganizationRequest
  implements Executable<RemoveItemCampaignResponse>
{
  constructor(
    public campaignId: string,
    public campaignItem: EntityReference | EntityPayload<campaignitem>
  ) {
    super("RemoveItemCampaign");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/campaigns(${this.campaignId})/Microsoft.Dynamics.CRM.RemoveItemCampaign`;

    const body: Record<string, unknown> = {
      CampaignItem: this.campaignItem,
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

  async parseResponse(response: Response): Promise<RemoveItemCampaignResponse> {
    // No return value (204 No Content)
    return new RemoveItemCampaignResponse();
  }
}

/**
 * RemoveItemCampaign response message
 */
export class RemoveItemCampaignResponse extends OrganizationResponse {
  constructor() {
    super("RemoveItemCampaign");
  }

  static fromResponse(_data: unknown): RemoveItemCampaignResponse {
    return new RemoveItemCampaignResponse();
  }
}
