import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { campaignactivityitem } from "./types/index.js";

/**
 * Parameters of the RemoveItemCampaignActivity message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RemoveItemCampaignActivityRequestParameters {
  CampaignActivityItem: EntityReference | EntityPayload<campaignactivityitem>;
}

/**
 * RemoveItemCampaignActivity request message
 *
 * Web API Action: RemoveItemCampaignActivity
 *
 * The first argument is the id of the campaignactivity record to call it on.
 */
export class RemoveItemCampaignActivityRequest
  extends OrganizationRequest
  implements Executable<RemoveItemCampaignActivityResponse>
{
  declare readonly Parameters: Readonly<RemoveItemCampaignActivityRequestParameters>;

  constructor(
    public campaignactivityId: string,
    parameters: RemoveItemCampaignActivityRequestParameters
  ) {
    super("RemoveItemCampaignActivity", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/campaignactivities(${this.campaignactivityId})/Microsoft.Dynamics.CRM.RemoveItemCampaignActivity`;

    const body = requestBody({
      CampaignActivityItem: this.Parameters.CampaignActivityItem,
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
