import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from msdynmkt_GetDataverseTableMetadataItems action
 */
export interface msdynmkt_GetDataverseTableMetadataItemsResponse {
  value: EntityReference[];
}

/**
 * msdynmkt_GetDataverseTableMetadataItems action
 *
 * Unbound action
 */
export class msdynmkt_GetDataverseTableMetadataItemsAction implements Executable<msdynmkt_GetDataverseTableMetadataItemsResponse> {
  constructor(
    public readonly msdynmkt_GetDataverseTableMetadataItems_request_LanguageCode:
      number | undefined,
    public readonly msdynmkt_GetDataverseTableMetadataItems_request_SourceLogicalNames: string[],
    public readonly msdynmkt_GetDataverseTableMetadataItems_request_UseLazyLoading?: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_GetDataverseTableMetadataItems`;

    const body: Record<string, unknown> = {
      msdynmkt_GetDataverseTableMetadataItems_request_LanguageCode:
        this.msdynmkt_GetDataverseTableMetadataItems_request_LanguageCode,
      msdynmkt_GetDataverseTableMetadataItems_request_SourceLogicalNames:
        this.msdynmkt_GetDataverseTableMetadataItems_request_SourceLogicalNames,
      msdynmkt_GetDataverseTableMetadataItems_request_UseLazyLoading:
        this.msdynmkt_GetDataverseTableMetadataItems_request_UseLazyLoading,
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

  async parseResponse(
    response: Response
  ): Promise<msdynmkt_GetDataverseTableMetadataItemsResponse> {
    const data = await response.json();
    return data as msdynmkt_GetDataverseTableMetadataItemsResponse;
  }
}
