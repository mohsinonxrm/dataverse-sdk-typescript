import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { AnyEntityPayload, EntityPayload } from "./types/EntityPayload.js";
import type {
  AddItemCampaignActivityResponse as AddItemCampaignActivityResponseData,
  campaignactivity,
} from "./types/index.js";

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
    public campaignActivity: EntityReference | EntityPayload<campaignactivity>,
    public item: EntityReference | AnyEntityPayload
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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<AddItemCampaignActivityResponse> {
    const data = await response.json();
    return AddItemCampaignActivityResponse.fromResponse(data);
  }
}

/**
 * AddItemCampaignActivity response message
 */
export class AddItemCampaignActivityResponse extends OrganizationResponse {
  constructor(public result: AddItemCampaignActivityResponseData) {
    super("AddItemCampaignActivity");
  }

  static fromResponse(data: unknown): AddItemCampaignActivityResponse {
    return new AddItemCampaignActivityResponse(
      responseObject<AddItemCampaignActivityResponseData>(data)
    );
  }
}
