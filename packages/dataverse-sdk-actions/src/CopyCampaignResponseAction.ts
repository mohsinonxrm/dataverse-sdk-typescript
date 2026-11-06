import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { campaignresponse } from "./types/index.js";

/**
 * Response from CopyCampaignResponse action
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface CopyCampaignResponseResponse extends campaignresponse {
  "@odata.context"?: string;
  "@odata.etag"?: string;
}

/**
 * CopyCampaignResponse action
 *
 * Bound action
 * Binding parameter: entity (mscrm.campaignresponse)
 *
 * The first argument is the id of the campaignresponse record to call it on.
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as CopyCampaignResponseResponse;
  }
}
