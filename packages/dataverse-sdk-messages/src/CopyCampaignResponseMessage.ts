import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import type { campaignresponse } from "./types/index.js";

/**
 * CopyCampaignResponse request message
 *
 * Web API Action: CopyCampaignResponse
 *
 * The first argument is the id of the campaignresponse record to call it on.
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
    const url = `${baseUrl}/campaignresponses(${odataLiteral.guid(this.campaignresponseId)})/Microsoft.Dynamics.CRM.CopyCampaignResponse`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<CopyCampaignResponseResponse> {
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return CopyCampaignResponseResponse.fromResponse(undefined);
    // The body is the record, with its annotations
    return CopyCampaignResponseResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the CopyCampaignResponse action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type CopyCampaignResponseResult =
  | (campaignresponse & {
      "@odata.context"?: string;
      "@odata.etag"?: string;
      "@odata.type"?: string;
    })
  | null;

/**
 * CopyCampaignResponse response message
 *
 * `result` is the value the CopyCampaignResponse action returns (see {@link CopyCampaignResponseResult}).
 */
export class CopyCampaignResponseResponse extends OrganizationResponse {
  constructor(public result: CopyCampaignResponseResult) {
    super("CopyCampaignResponse");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): CopyCampaignResponseResponse {
    return new CopyCampaignResponseResponse((data ?? null) as CopyCampaignResponseResult);
  }
}
