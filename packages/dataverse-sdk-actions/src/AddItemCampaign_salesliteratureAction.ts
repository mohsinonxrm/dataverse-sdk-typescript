import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { campaign, campaignitem } from "./types/index.js";

/**
 * Response from AddItemCampaign action
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface AddItemCampaign_salesliteratureResponse extends campaignitem {
  "@odata.context"?: string;
  "@odata.etag"?: string;
}

/**
 * AddItemCampaign action
 *
 * Bound action
 * Binding parameter: entity (mscrm.salesliterature)
 */
export class AddItemCampaign_salesliteratureAction implements Executable<AddItemCampaign_salesliteratureResponse> {
  constructor(
    public readonly salesliteratureId: string,
    public readonly campaign: EntityReference | EntityPayload<campaign>
  ) {}

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
    return data as AddItemCampaign_salesliteratureResponse;
  }
}
