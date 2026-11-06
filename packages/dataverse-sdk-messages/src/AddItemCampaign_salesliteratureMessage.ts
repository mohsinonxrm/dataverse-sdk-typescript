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
export interface AddItemCampaign_salesliteratureRequestParameters {
  Campaign: EntityReference | EntityPayload<campaign>;
}

/**
 * AddItemCampaign request message
 *
 * Web API Action: AddItemCampaign
 *
 * The first argument is the id of the salesliterature record to call it on.
 */
export class AddItemCampaign_salesliteratureRequest
  extends OrganizationRequest
  implements Executable<AddItemCampaign_salesliteratureResponse>
{
  declare readonly Parameters: Readonly<AddItemCampaign_salesliteratureRequestParameters>;

  constructor(
    public salesliteratureId: string,
    parameters: AddItemCampaign_salesliteratureRequestParameters
  ) {
    super("AddItemCampaign", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/salesliteratures(${this.salesliteratureId})/Microsoft.Dynamics.CRM.AddItemCampaign`;

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

  async parseResponse(response: Response): Promise<AddItemCampaign_salesliteratureResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return AddItemCampaign_salesliteratureResponse.fromResponse({});
    return AddItemCampaign_salesliteratureResponse.fromResponse(await response.json());
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
