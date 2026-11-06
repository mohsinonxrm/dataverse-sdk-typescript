import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseValue } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdynmkt_GetAllCjoEventsMetadataItems message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_GetAllCjoEventsMetadataItemsRequestParameters {
  msdynmkt_GetAllCjoEventsMetadataItems_request_LanguageCode?: number;
}

/**
 * msdynmkt_GetAllCjoEventsMetadataItems request message
 *
 * Web API Action: msdynmkt_GetAllCjoEventsMetadataItems
 */
export class msdynmkt_GetAllCjoEventsMetadataItemsRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_GetAllCjoEventsMetadataItemsResponse>
{
  declare readonly Parameters: Readonly<msdynmkt_GetAllCjoEventsMetadataItemsRequestParameters>;

  constructor(parameters: msdynmkt_GetAllCjoEventsMetadataItemsRequestParameters = {}) {
    super("msdynmkt_GetAllCjoEventsMetadataItems", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_GetAllCjoEventsMetadataItems`;

    const body = requestBody({
      msdynmkt_GetAllCjoEventsMetadataItems_request_LanguageCode:
        this.Parameters.msdynmkt_GetAllCjoEventsMetadataItems_request_LanguageCode,
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

  async parseResponse(response: Response): Promise<msdynmkt_GetAllCjoEventsMetadataItemsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdynmkt_GetAllCjoEventsMetadataItemsResponse.fromResponse({});
    return msdynmkt_GetAllCjoEventsMetadataItemsResponse.fromResponse(await response.json());
  }
}

/**
 * msdynmkt_GetAllCjoEventsMetadataItems response message
 */
export class msdynmkt_GetAllCjoEventsMetadataItemsResponse extends OrganizationResponse {
  constructor(public result: Record<string, unknown>[]) {
    super("msdynmkt_GetAllCjoEventsMetadataItems");
  }

  static fromResponse(data: unknown): msdynmkt_GetAllCjoEventsMetadataItemsResponse {
    return new msdynmkt_GetAllCjoEventsMetadataItemsResponse(
      responseValue<Record<string, unknown>[]>(data)
    );
  }
}
