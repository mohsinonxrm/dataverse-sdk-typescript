import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseValue } from "./internal/responseData.js";

/**
 * msdynmkt_GetCjoEventsMetadataItemsByNames request message
 *
 * Web API Action: msdynmkt_GetCjoEventsMetadataItemsByNames
 */
export class msdynmkt_GetCjoEventsMetadataItemsByNamesRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_GetCjoEventsMetadataItemsByNamesResponse>
{
  constructor(
    public msdynmkt_GetCjoEventsMetadataItemsByNames_request_LanguageCode: number,
    public msdynmkt_GetCjoEventsMetadataItemsByNames_request_EventNames: string[]
  ) {
    super("msdynmkt_GetCjoEventsMetadataItemsByNames");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_GetCjoEventsMetadataItemsByNames`;

    const body: Record<string, unknown> = {
      msdynmkt_GetCjoEventsMetadataItemsByNames_request_LanguageCode:
        this.msdynmkt_GetCjoEventsMetadataItemsByNames_request_LanguageCode,
      msdynmkt_GetCjoEventsMetadataItemsByNames_request_EventNames:
        this.msdynmkt_GetCjoEventsMetadataItemsByNames_request_EventNames,
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
  ): Promise<msdynmkt_GetCjoEventsMetadataItemsByNamesResponse> {
    const data = await response.json();
    return msdynmkt_GetCjoEventsMetadataItemsByNamesResponse.fromResponse(data);
  }
}

/**
 * msdynmkt_GetCjoEventsMetadataItemsByNames response message
 */
export class msdynmkt_GetCjoEventsMetadataItemsByNamesResponse extends OrganizationResponse {
  constructor(public result: Record<string, unknown>[]) {
    super("msdynmkt_GetCjoEventsMetadataItemsByNames");
  }

  static fromResponse(data: unknown): msdynmkt_GetCjoEventsMetadataItemsByNamesResponse {
    return new msdynmkt_GetCjoEventsMetadataItemsByNamesResponse(
      responseValue<Record<string, unknown>[]>(data)
    );
  }
}
