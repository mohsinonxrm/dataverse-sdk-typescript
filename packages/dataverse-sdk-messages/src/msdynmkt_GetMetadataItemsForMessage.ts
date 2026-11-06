import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseValue } from "./internal/responseData.js";

/**
 * msdynmkt_GetMetadataItemsFor request message
 *
 * Web API Action: msdynmkt_GetMetadataItemsFor
 */
export class msdynmkt_GetMetadataItemsForRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_GetMetadataItemsForResponse>
{
  constructor(
    public msdynmkt_GetMetadataItemsFor_request_LanguageCode: number | undefined,
    public msdynmkt_GetMetadataItemsFor_request_SourceLogicalNames: string[]
  ) {
    super("msdynmkt_GetMetadataItemsFor");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_GetMetadataItemsFor`;

    const body: Record<string, unknown> = {
      msdynmkt_GetMetadataItemsFor_request_LanguageCode:
        this.msdynmkt_GetMetadataItemsFor_request_LanguageCode,
      msdynmkt_GetMetadataItemsFor_request_SourceLogicalNames:
        this.msdynmkt_GetMetadataItemsFor_request_SourceLogicalNames,
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

  async parseResponse(response: Response): Promise<msdynmkt_GetMetadataItemsForResponse> {
    const data = await response.json();
    return msdynmkt_GetMetadataItemsForResponse.fromResponse(data);
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
