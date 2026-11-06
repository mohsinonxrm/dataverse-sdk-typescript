import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { campaign } from "./types/index.js";

/**
 * Response from CopyCampaign action
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface CopyCampaignResponse extends campaign {
  "@odata.context"?: string;
  "@odata.etag"?: string;
}

/**
 * CopyCampaign action
 *
 * Bound action
 * Binding parameter: entity (mscrm.campaign)
 */
export class CopyCampaignAction implements Executable<CopyCampaignResponse> {
  constructor(
    public readonly campaignId: string,
    public readonly saveAsTemplate: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/campaigns(${this.campaignId})/Microsoft.Dynamics.CRM.CopyCampaign`;

    const body: Record<string, unknown> = {
      SaveAsTemplate: this.saveAsTemplate,
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

  async parseResponse(response: Response): Promise<CopyCampaignResponse> {
    const data = await response.json();
    return data as CopyCampaignResponse;
  }
}
