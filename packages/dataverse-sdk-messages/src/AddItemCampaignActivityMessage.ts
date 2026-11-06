import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload, EntityPayload } from "./types/EntityPayload.js";
import type {
  AddItemCampaignActivityResponse as AddItemCampaignActivityResponseData,
  campaignactivity,
} from "./types/index.js";

/**
 * Parameters of the AddItemCampaignActivity message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface AddItemCampaignActivityRequestParameters {
  CampaignActivity: EntityReference | EntityPayload<campaignactivity>;
  Item: EntityReference | AnyEntityPayload;
}

/**
 * AddItemCampaignActivity request message
 *
 * Web API Action: AddItemCampaignActivity
 */
export class AddItemCampaignActivityRequest
  extends OrganizationRequest
  implements Executable<AddItemCampaignActivityResponse>
{
  declare readonly Parameters: Readonly<AddItemCampaignActivityRequestParameters>;

  constructor(parameters: AddItemCampaignActivityRequestParameters) {
    super("AddItemCampaignActivity", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/AddItemCampaignActivity`;

    const body = requestBody({
      CampaignActivity: this.Parameters.CampaignActivity,
      Item: this.Parameters.Item,
    });

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
    // 204 No Content is an empty result
    if (response.status === 204) return AddItemCampaignActivityResponse.fromResponse({});
    return AddItemCampaignActivityResponse.fromResponse(await response.json());
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
