import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
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
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return CopyCampaignResponse.fromResponse(undefined);
    // The body is the record, with its annotations
    return CopyCampaignResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the CopyCampaign action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type CopyCampaignResult =
  (campaign & { "@odata.context"?: string; "@odata.etag"?: string; "@odata.type"?: string }) | null;

/**
 * CopyCampaign response message
 *
 * `result` is the value the CopyCampaign action returns (see {@link CopyCampaignResult}).
 */
export class CopyCampaignResponse extends OrganizationResponse {
  constructor(public result: CopyCampaignResult) {
    super("CopyCampaign");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): CopyCampaignResponse {
    return new CopyCampaignResponse((data ?? null) as CopyCampaignResult);
  }
}
