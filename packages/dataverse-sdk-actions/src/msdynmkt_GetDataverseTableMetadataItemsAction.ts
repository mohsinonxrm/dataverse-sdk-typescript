import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdynmkt_GetDataverseTableMetadataItems action
 */
export interface msdynmkt_GetDataverseTableMetadataItemsResponse {
  value: EntityReference[];
}

/**
 * Parameters of the msdynmkt_GetDataverseTableMetadataItems action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_GetDataverseTableMetadataItemsActionParameters {
  msdynmkt_GetDataverseTableMetadataItems_request_LanguageCode?: number;
  msdynmkt_GetDataverseTableMetadataItems_request_SourceLogicalNames: string[];
  msdynmkt_GetDataverseTableMetadataItems_request_UseLazyLoading?: boolean;
}

/**
 * msdynmkt_GetDataverseTableMetadataItems action
 *
 * Unbound action
 */
export class msdynmkt_GetDataverseTableMetadataItemsAction implements Executable<msdynmkt_GetDataverseTableMetadataItemsResponse> {
  constructor(
    public readonly parameters: msdynmkt_GetDataverseTableMetadataItemsActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_GetDataverseTableMetadataItems`;

    const body = requestBody({
      msdynmkt_GetDataverseTableMetadataItems_request_LanguageCode:
        this.parameters.msdynmkt_GetDataverseTableMetadataItems_request_LanguageCode,
      msdynmkt_GetDataverseTableMetadataItems_request_SourceLogicalNames:
        this.parameters.msdynmkt_GetDataverseTableMetadataItems_request_SourceLogicalNames,
      msdynmkt_GetDataverseTableMetadataItems_request_UseLazyLoading:
        this.parameters.msdynmkt_GetDataverseTableMetadataItems_request_UseLazyLoading,
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

  async parseResponse(
    response: Response
  ): Promise<msdynmkt_GetDataverseTableMetadataItemsResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdynmkt_GetDataverseTableMetadataItemsResponse;
  }
}
