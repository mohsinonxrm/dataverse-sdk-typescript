import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdynmkt_GetMetadataItemsFor action
 */
export interface msdynmkt_GetMetadataItemsForResponse {
  value: EntityReference[];
}

/**
 * Parameters of the msdynmkt_GetMetadataItemsFor action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_GetMetadataItemsForActionParameters {
  msdynmkt_GetMetadataItemsFor_request_LanguageCode?: number;
  msdynmkt_GetMetadataItemsFor_request_SourceLogicalNames: string[];
}

/**
 * msdynmkt_GetMetadataItemsFor action
 *
 * Unbound action
 */
export class msdynmkt_GetMetadataItemsForAction implements Executable<msdynmkt_GetMetadataItemsForResponse> {
  constructor(public readonly parameters: msdynmkt_GetMetadataItemsForActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_GetMetadataItemsFor`;

    const body = requestBody({
      msdynmkt_GetMetadataItemsFor_request_LanguageCode:
        this.parameters.msdynmkt_GetMetadataItemsFor_request_LanguageCode,
      msdynmkt_GetMetadataItemsFor_request_SourceLogicalNames:
        this.parameters.msdynmkt_GetMetadataItemsFor_request_SourceLogicalNames,
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

  async parseResponse(response: Response): Promise<msdynmkt_GetMetadataItemsForResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdynmkt_GetMetadataItemsForResponse;
    return (await response.json()) as msdynmkt_GetMetadataItemsForResponse;
  }
}
