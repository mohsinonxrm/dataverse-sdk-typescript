import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseValue } from "./internal/responseData.js";

/**
 * msdynmkt_GetAllCjoEventsMetadataItems request message
 *
 * Web API Action: msdynmkt_GetAllCjoEventsMetadataItems
 */
export class msdynmkt_GetAllCjoEventsMetadataItemsRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_GetAllCjoEventsMetadataItemsResponse>
{
  constructor(public msdynmkt_GetAllCjoEventsMetadataItems_request_LanguageCode: number) {
    super("msdynmkt_GetAllCjoEventsMetadataItems");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_GetAllCjoEventsMetadataItems`;

    const body: Record<string, unknown> = {
      msdynmkt_GetAllCjoEventsMetadataItems_request_LanguageCode:
        this.msdynmkt_GetAllCjoEventsMetadataItems_request_LanguageCode,
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

  async parseResponse(response: Response): Promise<msdynmkt_GetAllCjoEventsMetadataItemsResponse> {
    const data = await response.json();
    return msdynmkt_GetAllCjoEventsMetadataItemsResponse.fromResponse(data);
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
