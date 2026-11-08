import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import type { campaign } from "./types/index.js";

/**
 * Response from the CopyCampaign action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type CopyCampaignResponse =
  (campaign & { "@odata.context"?: string; "@odata.etag"?: string; "@odata.type"?: string }) | null;

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
    const url = `${baseUrl}/campaigns(${odataLiteral.guid(this.campaignId)})/Microsoft.Dynamics.CRM.CopyCampaign`;

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
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return null;
    // The body is the record, with its annotations
    return (await response.json()) as CopyCampaignResponse;
  }
}
