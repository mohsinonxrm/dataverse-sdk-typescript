import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseValue } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdynmkt_GetAllLegalMetadataItems message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_GetAllLegalMetadataItemsRequestParameters {
  msdynmkt_GetAllLegalMetadataItems_request_LanguageCode?: number;
}

/**
 * msdynmkt_GetAllLegalMetadataItems request message
 *
 * Web API Action: msdynmkt_GetAllLegalMetadataItems
 */
export class msdynmkt_GetAllLegalMetadataItemsRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_GetAllLegalMetadataItemsResponse>
{
  declare readonly Parameters: Readonly<msdynmkt_GetAllLegalMetadataItemsRequestParameters>;

  constructor(parameters: msdynmkt_GetAllLegalMetadataItemsRequestParameters = {}) {
    super("msdynmkt_GetAllLegalMetadataItems", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_GetAllLegalMetadataItems`;

    const body = requestBody({
      msdynmkt_GetAllLegalMetadataItems_request_LanguageCode:
        this.Parameters.msdynmkt_GetAllLegalMetadataItems_request_LanguageCode,
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdynmkt_GetAllLegalMetadataItemsResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdynmkt_GetAllLegalMetadataItems response message
 */
export class msdynmkt_GetAllLegalMetadataItemsResponse extends OrganizationResponse {
  constructor(public result: Record<string, unknown>[]) {
    super("msdynmkt_GetAllLegalMetadataItems");
  }

  static fromResponse(data: unknown): msdynmkt_GetAllLegalMetadataItemsResponse {
    return new msdynmkt_GetAllLegalMetadataItemsResponse(
      responseValue<Record<string, unknown>[]>(data)
    );
  }
}
