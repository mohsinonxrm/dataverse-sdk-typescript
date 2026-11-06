import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdynmkt_GetDataverseTableMetadataItems action.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type msdynmkt_GetDataverseTableMetadataItemsResponse = Array<{
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
}>;

/**
 * Parameters of the msdynmkt_GetDataverseTableMetadataItems action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_GetDataverseTableMetadataItemsActionParameters {
  msdynmkt_GetDataverseTableMetadataItems_request_UseLazyLoading?: boolean;
  msdynmkt_GetDataverseTableMetadataItems_request_SourceLogicalNames: string[];
  msdynmkt_GetDataverseTableMetadataItems_request_LanguageCode?: number;
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
      msdynmkt_GetDataverseTableMetadataItems_request_UseLazyLoading:
        this.parameters.msdynmkt_GetDataverseTableMetadataItems_request_UseLazyLoading,
      msdynmkt_GetDataverseTableMetadataItems_request_SourceLogicalNames:
        this.parameters.msdynmkt_GetDataverseTableMetadataItems_request_SourceLogicalNames,
      msdynmkt_GetDataverseTableMetadataItems_request_LanguageCode:
        this.parameters.msdynmkt_GetDataverseTableMetadataItems_request_LanguageCode,
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
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204) return [];
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return ((await response.json()) as { value: msdynmkt_GetDataverseTableMetadataItemsResponse })
      .value;
  }
}
