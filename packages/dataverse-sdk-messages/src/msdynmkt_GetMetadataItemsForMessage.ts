import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseValue } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdynmkt_GetMetadataItemsFor message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_GetMetadataItemsForRequestParameters {
  msdynmkt_GetMetadataItemsFor_request_LanguageCode?: number;
  msdynmkt_GetMetadataItemsFor_request_SourceLogicalNames: string[];
}

/**
 * msdynmkt_GetMetadataItemsFor request message
 *
 * Web API Action: msdynmkt_GetMetadataItemsFor
 */
export class msdynmkt_GetMetadataItemsForRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_GetMetadataItemsForResponse>
{
  declare readonly Parameters: Readonly<msdynmkt_GetMetadataItemsForRequestParameters>;

  constructor(parameters: msdynmkt_GetMetadataItemsForRequestParameters) {
    super("msdynmkt_GetMetadataItemsFor", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_GetMetadataItemsFor`;

    const body = requestBody({
      msdynmkt_GetMetadataItemsFor_request_LanguageCode:
        this.Parameters.msdynmkt_GetMetadataItemsFor_request_LanguageCode,
      msdynmkt_GetMetadataItemsFor_request_SourceLogicalNames:
        this.Parameters.msdynmkt_GetMetadataItemsFor_request_SourceLogicalNames,
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

  async parseResponse(response: Response): Promise<msdynmkt_GetMetadataItemsForResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdynmkt_GetMetadataItemsForResponse.fromResponse({});
    return msdynmkt_GetMetadataItemsForResponse.fromResponse(await response.json());
  }
}

/**
 * msdynmkt_GetMetadataItemsFor response message
 */
export class msdynmkt_GetMetadataItemsForResponse extends OrganizationResponse {
  constructor(public result: Record<string, unknown>[]) {
    super("msdynmkt_GetMetadataItemsFor");
  }

  static fromResponse(data: unknown): msdynmkt_GetMetadataItemsForResponse {
    return new msdynmkt_GetMetadataItemsForResponse(responseValue<Record<string, unknown>[]>(data));
  }
}
