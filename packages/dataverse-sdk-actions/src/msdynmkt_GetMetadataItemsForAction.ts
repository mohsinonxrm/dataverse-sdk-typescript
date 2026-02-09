import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from msdynmkt_GetMetadataItemsFor action
 */
export interface msdynmkt_GetMetadataItemsForResponse {
  value: EntityReference[];
}

/**
 * msdynmkt_GetMetadataItemsFor action
 *
 * Unbound action
 */
export class msdynmkt_GetMetadataItemsForAction implements Executable<msdynmkt_GetMetadataItemsForResponse> {
  constructor(
    public readonly msdynmkt_GetMetadataItemsFor_request_LanguageCode: number,
    public readonly msdynmkt_GetMetadataItemsFor_request_SourceLogicalNames: string[]
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_GetMetadataItemsFor`;

    const body: Record<string, unknown> = {
      msdynmkt_GetMetadataItemsFor_request_LanguageCode:
        this.msdynmkt_GetMetadataItemsFor_request_LanguageCode,
      msdynmkt_GetMetadataItemsFor_request_SourceLogicalNames:
        this.msdynmkt_GetMetadataItemsFor_request_SourceLogicalNames,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdynmkt_GetMetadataItemsForResponse> {
    const data = await response.json();
    return data as msdynmkt_GetMetadataItemsForResponse;
  }
}
