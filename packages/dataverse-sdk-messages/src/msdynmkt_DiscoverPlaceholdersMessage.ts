import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdynmkt_DiscoverPlaceholdersResponse as msdynmkt_DiscoverPlaceholdersResponseData } from "./types/index.js";

/**
 * Parameters of the msdynmkt_DiscoverPlaceholders message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_DiscoverPlaceholdersRequestParameters {
  DiscoverPlaceholdersRequest?: string;
}

/**
 * msdynmkt_DiscoverPlaceholders request message
 *
 * Web API Action: msdynmkt_DiscoverPlaceholders
 */
export class msdynmkt_DiscoverPlaceholdersRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_DiscoverPlaceholdersResponse>
{
  declare readonly Parameters: Readonly<msdynmkt_DiscoverPlaceholdersRequestParameters>;

  constructor(parameters: msdynmkt_DiscoverPlaceholdersRequestParameters = {}) {
    super("msdynmkt_DiscoverPlaceholders", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_DiscoverPlaceholders`;

    const body = requestBody({
      DiscoverPlaceholdersRequest: this.Parameters.DiscoverPlaceholdersRequest,
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

  async parseResponse(response: Response): Promise<msdynmkt_DiscoverPlaceholdersResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdynmkt_DiscoverPlaceholdersResponse.fromResponse({});
    return msdynmkt_DiscoverPlaceholdersResponse.fromResponse(await response.json());
  }
}

/**
 * msdynmkt_DiscoverPlaceholders response message
 */
export class msdynmkt_DiscoverPlaceholdersResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_DiscoverPlaceholdersResponseData) {
    super("msdynmkt_DiscoverPlaceholders");
  }

  static fromResponse(data: unknown): msdynmkt_DiscoverPlaceholdersResponse {
    return new msdynmkt_DiscoverPlaceholdersResponse(
      responseObject<msdynmkt_DiscoverPlaceholdersResponseData>(data)
    );
  }
}
