import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdynmkt_GetAllLegalMetadataItems action
 */
export interface msdynmkt_GetAllLegalMetadataItemsResponse {
  value: EntityReference[];
}

/**
 * Parameters of the msdynmkt_GetAllLegalMetadataItems action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_GetAllLegalMetadataItemsActionParameters {
  msdynmkt_GetAllLegalMetadataItems_request_LanguageCode?: number;
}

/**
 * msdynmkt_GetAllLegalMetadataItems action
 *
 * Unbound action
 */
export class msdynmkt_GetAllLegalMetadataItemsAction implements Executable<msdynmkt_GetAllLegalMetadataItemsResponse> {
  constructor(public readonly parameters: msdynmkt_GetAllLegalMetadataItemsActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_GetAllLegalMetadataItems`;

    const body = requestBody({
      msdynmkt_GetAllLegalMetadataItems_request_LanguageCode:
        this.parameters.msdynmkt_GetAllLegalMetadataItems_request_LanguageCode,
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

  async parseResponse(response: Response): Promise<msdynmkt_GetAllLegalMetadataItemsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdynmkt_GetAllLegalMetadataItemsResponse;
    return (await response.json()) as msdynmkt_GetAllLegalMetadataItemsResponse;
  }
}
