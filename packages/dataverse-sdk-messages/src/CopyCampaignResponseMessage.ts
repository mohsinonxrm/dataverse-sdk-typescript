import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { campaignresponse } from "./types/index.js";

/**
 * CopyCampaignResponse request message
 *
 * Web API Action: CopyCampaignResponse
 */
export class CopyCampaignResponseRequest
  extends OrganizationRequest
  implements Executable<CopyCampaignResponseResponse>
{
  constructor(public campaignresponseId: string) {
    super("CopyCampaignResponse");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/campaignresponses(${this.campaignresponseId})/Microsoft.Dynamics.CRM.CopyCampaignResponse`;

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<CopyCampaignResponseResponse> {
    const data = await response.json();
    return CopyCampaignResponseResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.campaignresponseId,
    };
  }
}

/**
 * CopyCampaignResponse response message
 */
export class CopyCampaignResponseResponse extends OrganizationResponse {
  constructor(public result: campaignresponse) {
    super("CopyCampaignResponse");
  }

  static fromResponse(data: unknown): CopyCampaignResponseResponse {
    return new CopyCampaignResponseResponse((data as any).value);
  }
}
