import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseValue } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdynmkt_GetCjoEventsMetadataItemsByNames message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_GetCjoEventsMetadataItemsByNamesRequestParameters {
  msdynmkt_GetCjoEventsMetadataItemsByNames_request_LanguageCode?: number;
  msdynmkt_GetCjoEventsMetadataItemsByNames_request_EventNames: string[];
}

/**
 * msdynmkt_GetCjoEventsMetadataItemsByNames request message
 *
 * Web API Action: msdynmkt_GetCjoEventsMetadataItemsByNames
 */
export class msdynmkt_GetCjoEventsMetadataItemsByNamesRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_GetCjoEventsMetadataItemsByNamesResponse>
{
  declare readonly Parameters: Readonly<msdynmkt_GetCjoEventsMetadataItemsByNamesRequestParameters>;

  constructor(parameters: msdynmkt_GetCjoEventsMetadataItemsByNamesRequestParameters) {
    super("msdynmkt_GetCjoEventsMetadataItemsByNames", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_GetCjoEventsMetadataItemsByNames`;

    const body = requestBody({
      msdynmkt_GetCjoEventsMetadataItemsByNames_request_LanguageCode:
        this.Parameters.msdynmkt_GetCjoEventsMetadataItemsByNames_request_LanguageCode,
      msdynmkt_GetCjoEventsMetadataItemsByNames_request_EventNames:
        this.Parameters.msdynmkt_GetCjoEventsMetadataItemsByNames_request_EventNames,
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
  ): Promise<msdynmkt_GetCjoEventsMetadataItemsByNamesResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdynmkt_GetCjoEventsMetadataItemsByNamesResponse.fromResponse({});
    return msdynmkt_GetCjoEventsMetadataItemsByNamesResponse.fromResponse(await response.json());
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
