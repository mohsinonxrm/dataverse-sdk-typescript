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
export interface AddItemCampaign_productRequestParameters {
  Campaign: EntityReference | EntityPayload<campaign>;
}

/**
 * AddItemCampaign request message
 *
 * Web API Action: AddItemCampaign
 *
 * The first argument is the id of the product record to call it on.
 */
export class AddItemCampaign_productRequest
  extends OrganizationRequest
  implements Executable<AddItemCampaign_productResponse>
{
  declare readonly Parameters: Readonly<AddItemCampaign_productRequestParameters>;

  constructor(
    public productId: string,
    parameters: AddItemCampaign_productRequestParameters
  ) {
    super("AddItemCampaign", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/products(${this.productId})/Microsoft.Dynamics.CRM.AddItemCampaign`;

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

  async parseResponse(response: Response): Promise<AddItemCampaign_productResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return AddItemCampaign_productResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * AddItemCampaign response message
 */
export class AddItemCampaign_productResponse extends OrganizationResponse {
  constructor(public result: campaignitem) {
    super("AddItemCampaign");
  }

  static fromResponse(data: unknown): AddItemCampaign_productResponse {
    return new AddItemCampaign_productResponse(responseObject<campaignitem>(data));
  }
}
