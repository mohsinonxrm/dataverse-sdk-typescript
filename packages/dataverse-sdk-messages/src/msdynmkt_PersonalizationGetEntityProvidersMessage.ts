import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdynmkt_PersonalizationGetEntityProvidersResponse as msdynmkt_PersonalizationGetEntityProvidersResponseData } from "./types/index.js";

/**
 * Parameters of the msdynmkt_PersonalizationGetEntityProviders message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_PersonalizationGetEntityProvidersRequestParameters {
  GetProvidersRequest?: string;
}

/**
 * msdynmkt_PersonalizationGetEntityProviders request message
 *
 * Web API Action: msdynmkt_PersonalizationGetEntityProviders
 */
export class msdynmkt_PersonalizationGetEntityProvidersRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_PersonalizationGetEntityProvidersResponse>
{
  declare readonly Parameters: Readonly<msdynmkt_PersonalizationGetEntityProvidersRequestParameters>;

  constructor(parameters: msdynmkt_PersonalizationGetEntityProvidersRequestParameters = {}) {
    super("msdynmkt_PersonalizationGetEntityProviders", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_PersonalizationGetEntityProviders`;

    const body = requestBody({
      GetProvidersRequest: this.Parameters.GetProvidersRequest,
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
  ): Promise<msdynmkt_PersonalizationGetEntityProvidersResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdynmkt_PersonalizationGetEntityProvidersResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
  }
}

/**
 * msdynmkt_PersonalizationGetEntityProviders response message
 */
export class msdynmkt_PersonalizationGetEntityProvidersResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_PersonalizationGetEntityProvidersResponseData) {
    super("msdynmkt_PersonalizationGetEntityProviders");
  }

  static fromResponse(data: unknown): msdynmkt_PersonalizationGetEntityProvidersResponse {
    return new msdynmkt_PersonalizationGetEntityProvidersResponse(
      responseObject<msdynmkt_PersonalizationGetEntityProvidersResponseData>(data)
    );
  }
}
