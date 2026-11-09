import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import type { campaignresponse } from "./types/index.js";

/**
 * Response from the CopyCampaignResponse action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type CopyCampaignResponseResponse =
  | (campaignresponse & {
      "@odata.context"?: string;
      "@odata.etag"?: string;
      "@odata.type"?: string;
    })
  | null;

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
    if (response.status === 204) return null;
    // The body is the record, with its annotations
    return (await response.json()) as CopyCampaignResponseResponse;
  }
}
