import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { campaign } from "./types/index.js";

/**
 * CopyCampaign request message
 *
 * Web API Action: CopyCampaign
 */
export class CopyCampaignRequest
  extends OrganizationRequest
  implements Executable<CopyCampaignResponse>
{
  constructor(
    public campaignId: string,
    public saveAsTemplate: boolean
  ) {
    super("CopyCampaign");
  }

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
    return CopyCampaignResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.campaignId,
      SaveAsTemplate: this.saveAsTemplate,
    };
  }
}

/**
 * CopyCampaign response message
 */
export class CopyCampaignResponse extends OrganizationResponse {
  constructor(public result: campaign) {
    super("CopyCampaign");
  }

  static fromResponse(data: unknown): CopyCampaignResponse {
    return new CopyCampaignResponse((data as any).value);
  }
}
