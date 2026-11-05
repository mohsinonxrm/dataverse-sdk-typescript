import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from msdynmkt_GetAllLegalMetadataItems action
 */
export interface msdynmkt_GetAllLegalMetadataItemsResponse {
  value: EntityReference[];
}

/**
 * msdynmkt_GetAllLegalMetadataItems action
 *
 * Unbound action
 */
export class msdynmkt_GetAllLegalMetadataItemsAction implements Executable<msdynmkt_GetAllLegalMetadataItemsResponse> {
  constructor(public readonly msdynmkt_GetAllLegalMetadataItems_request_LanguageCode: number) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_GetAllLegalMetadataItems`;

    const body: Record<string, unknown> = {
      msdynmkt_GetAllLegalMetadataItems_request_LanguageCode:
        this.msdynmkt_GetAllLegalMetadataItems_request_LanguageCode,
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

  async parseResponse(response: Response): Promise<msdynmkt_GetAllLegalMetadataItemsResponse> {
    const data = await response.json();
    return data as msdynmkt_GetAllLegalMetadataItemsResponse;
  }
}
