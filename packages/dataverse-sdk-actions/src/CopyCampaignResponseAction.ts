import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { campaignresponse } from "./types/index.js";

/**
 * Response from CopyCampaignResponse action
 */
export interface CopyCampaignResponseResponse {
  value: campaignresponse;
}

/**
 * CopyCampaignResponse action
 *
 * Bound action
 * Binding parameter: entity (mscrm.campaignresponse)
 */
export class CopyCampaignResponseAction implements Executable<CopyCampaignResponseResponse> {
  constructor(public readonly campaignresponseId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/campaignresponses(${this.campaignresponseId})/Microsoft.Dynamics.CRM.CopyCampaignResponse`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<CopyCampaignResponseResponse> {
    const data = await response.json();
    return data as CopyCampaignResponseResponse;
  }
}
