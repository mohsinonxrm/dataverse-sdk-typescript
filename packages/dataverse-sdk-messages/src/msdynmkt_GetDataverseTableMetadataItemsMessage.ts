import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseValue } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdynmkt_GetDataverseTableMetadataItems message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_GetDataverseTableMetadataItemsRequestParameters {
  msdynmkt_GetDataverseTableMetadataItems_request_LanguageCode?: number;
  msdynmkt_GetDataverseTableMetadataItems_request_SourceLogicalNames: string[];
  msdynmkt_GetDataverseTableMetadataItems_request_UseLazyLoading?: boolean;
}

/**
 * msdynmkt_GetDataverseTableMetadataItems request message
 *
 * Web API Action: msdynmkt_GetDataverseTableMetadataItems
 */
export class msdynmkt_GetDataverseTableMetadataItemsRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_GetDataverseTableMetadataItemsResponse>
{
  declare readonly Parameters: Readonly<msdynmkt_GetDataverseTableMetadataItemsRequestParameters>;

  constructor(parameters: msdynmkt_GetDataverseTableMetadataItemsRequestParameters) {
    super("msdynmkt_GetDataverseTableMetadataItems", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_GetDataverseTableMetadataItems`;

    const body = requestBody({
      msdynmkt_GetDataverseTableMetadataItems_request_LanguageCode:
        this.Parameters.msdynmkt_GetDataverseTableMetadataItems_request_LanguageCode,
      msdynmkt_GetDataverseTableMetadataItems_request_SourceLogicalNames:
        this.Parameters.msdynmkt_GetDataverseTableMetadataItems_request_SourceLogicalNames,
      msdynmkt_GetDataverseTableMetadataItems_request_UseLazyLoading:
        this.Parameters.msdynmkt_GetDataverseTableMetadataItems_request_UseLazyLoading,
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
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdynmkt_GetDataverseTableMetadataItemsResponse.fromResponse({});
    return msdynmkt_GetDataverseTableMetadataItemsResponse.fromResponse(await response.json());
  }
}

/**
 * msdynmkt_GetDataverseTableMetadataItems response message
 */
export class msdynmkt_GetDataverseTableMetadataItemsResponse extends OrganizationResponse {
  constructor(public result: Record<string, unknown>[]) {
    super("msdynmkt_GetDataverseTableMetadataItems");
  }

  static fromResponse(data: unknown): msdynmkt_GetDataverseTableMetadataItemsResponse {
    return new msdynmkt_GetDataverseTableMetadataItemsResponse(
      responseValue<Record<string, unknown>[]>(data)
    );
  }
}
