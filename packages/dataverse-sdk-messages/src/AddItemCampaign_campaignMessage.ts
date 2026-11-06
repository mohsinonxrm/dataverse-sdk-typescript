import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { campaign, campaignitem } from "./types/index.js";

/**
 * Parameters of the AddItemCampaign message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface AddItemCampaign_campaignRequestParameters {
  Campaign: EntityReference | EntityPayload<campaign>;
}

/**
 * AddItemCampaign request message
 *
 * Web API Action: AddItemCampaign
 *
 * The first argument is the id of the campaign record to call it on.
 */
export class AddItemCampaign_campaignRequest
  extends OrganizationRequest
  implements Executable<AddItemCampaign_campaignResponse>
{
  declare readonly Parameters: Readonly<AddItemCampaign_campaignRequestParameters>;

  constructor(
    public campaignId: string,
    parameters: AddItemCampaign_campaignRequestParameters
  ) {
    super("AddItemCampaign", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/campaigns(${this.campaignId})/Microsoft.Dynamics.CRM.AddItemCampaign`;

    const body = requestBody({
      Campaign: this.Parameters.Campaign,
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

  async parseResponse(response: Response): Promise<AddItemCampaign_campaignResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return AddItemCampaign_campaignResponse.fromResponse(text ? JSON.parse(text) : {});
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
