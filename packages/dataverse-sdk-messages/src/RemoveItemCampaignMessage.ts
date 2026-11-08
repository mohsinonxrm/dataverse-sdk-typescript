import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { campaignitem } from "./types/index.js";

/**
 * Parameters of the RemoveItemCampaign message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RemoveItemCampaignRequestParameters {
  CampaignItem: EntityReference | EntityPayload<campaignitem>;
}

/**
 * RemoveItemCampaign request message
 *
 * Web API Action: RemoveItemCampaign
 *
 * The first argument is the id of the campaign record to call it on.
 */
export class RemoveItemCampaignRequest
  extends OrganizationRequest
  implements Executable<RemoveItemCampaignResponse>
{
  declare readonly Parameters: Readonly<RemoveItemCampaignRequestParameters>;

  constructor(
    public campaignId: string,
    parameters: RemoveItemCampaignRequestParameters
  ) {
    super("RemoveItemCampaign", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/campaigns(${odataLiteral.guid(this.campaignId)})/Microsoft.Dynamics.CRM.RemoveItemCampaign`;

    const body = requestBody({
      CampaignItem: this.Parameters.CampaignItem,
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

  parseResponse(_response: Response): Promise<RemoveItemCampaignResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new RemoveItemCampaignResponse());
  }
}

/**
 * RemoveItemCampaign response message
 */
export class RemoveItemCampaignResponse extends OrganizationResponse {
  constructor() {
    super("RemoveItemCampaign");
  }

  static fromResponse(_data?: unknown): RemoveItemCampaignResponse {
    return new RemoveItemCampaignResponse();
  }
}
