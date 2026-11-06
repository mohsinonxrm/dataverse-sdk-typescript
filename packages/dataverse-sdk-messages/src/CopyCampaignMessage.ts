import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { campaign } from "./types/index.js";

/**
 * Parameters of the CopyCampaign message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CopyCampaignRequestParameters {
  SaveAsTemplate: boolean;
}

/**
 * CopyCampaign request message
 *
 * Web API Action: CopyCampaign
 *
 * The first argument is the id of the campaign record to call it on.
 */
export class CopyCampaignRequest
  extends OrganizationRequest
  implements Executable<CopyCampaignResponse>
{
  declare readonly Parameters: Readonly<CopyCampaignRequestParameters>;

  constructor(
    public campaignId: string,
    parameters: CopyCampaignRequestParameters
  ) {
    super("CopyCampaign", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/campaigns(${this.campaignId})/Microsoft.Dynamics.CRM.CopyCampaign`;

    const body = requestBody({
      SaveAsTemplate: this.Parameters.SaveAsTemplate,
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return CopyCampaignResponse.fromResponse(text ? JSON.parse(text) : {});
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
    return new CopyCampaignResponse(responseObject<campaign>(data));
  }
}
