import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { campaign, campaignitem } from "./types/index.js";

/**
 * Response from AddItemCampaign action
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface AddItemCampaign_salesliteratureResponse extends campaignitem {
  "@odata.context"?: string;
  "@odata.etag"?: string;
}

/**
 * Parameters of the AddItemCampaign action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface AddItemCampaign_salesliteratureActionParameters {
  Campaign: EntityReference | EntityPayload<campaign>;
}

/**
 * AddItemCampaign action
 *
 * Bound action
 * Binding parameter: entity (mscrm.salesliterature)
 *
 * The first argument is the id of the salesliterature record to call it on.
 */
export class AddItemCampaign_salesliteratureAction implements Executable<AddItemCampaign_salesliteratureResponse> {
  constructor(
    public readonly salesliteratureId: string,
    public readonly parameters: AddItemCampaign_salesliteratureActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/salesliteratures(${this.salesliteratureId})/Microsoft.Dynamics.CRM.AddItemCampaign`;

    const body = requestBody({
      Campaign: this.parameters.Campaign,
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

  async parseResponse(response: Response): Promise<AddItemCampaign_salesliteratureResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as AddItemCampaign_salesliteratureResponse;
    return (await response.json()) as AddItemCampaign_salesliteratureResponse;
  }
}
