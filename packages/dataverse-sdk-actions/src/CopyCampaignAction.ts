import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
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
 * Parameters of the CopyCampaign action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CopyCampaignActionParameters {
  SaveAsTemplate: boolean;
}

/**
 * CopyCampaign action
 *
 * Bound action
 * Binding parameter: entity (mscrm.campaign)
 *
 * The first argument is the id of the campaign record to call it on.
 */
export class CopyCampaignAction implements Executable<CopyCampaignResponse> {
  constructor(
    public readonly campaignId: string,
    public readonly parameters: CopyCampaignActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/campaigns(${this.campaignId})/Microsoft.Dynamics.CRM.CopyCampaign`;

    const body = requestBody({
      SaveAsTemplate: this.parameters.SaveAsTemplate,
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

  async parseResponse(response: Response): Promise<CopyCampaignResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as CopyCampaignResponse;
    return (await response.json()) as CopyCampaignResponse;
  }
}
