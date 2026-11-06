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
export class AddItemCampaign_salesliteratureRequest
  extends OrganizationRequest
  implements Executable<AddItemCampaign_salesliteratureResponse>
{
  constructor(
    public salesliteratureId: string,
    public campaign: EntityReference | EntityPayload<campaign>
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

  async parseResponse(response: Response): Promise<AddItemCampaign_salesliteratureResponse> {
    const data = await response.json();
    return AddItemCampaign_salesliteratureResponse.fromResponse(data);
  }
}

/**
 * AddItemCampaign response message
 */
export class AddItemCampaign_salesliteratureResponse extends OrganizationResponse {
  constructor(public result: campaignitem) {
    super("AddItemCampaign");
  }

  static fromResponse(data: unknown): AddItemCampaign_salesliteratureResponse {
    return new AddItemCampaign_salesliteratureResponse(responseObject<campaignitem>(data));
  }
}
