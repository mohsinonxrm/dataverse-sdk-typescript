import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdynmkt_ChannelContentPersonalizeResponse as msdynmkt_ChannelContentPersonalizeResponseData } from "./types/index.js";

/**
 * Parameters of the msdynmkt_ChannelContentPersonalize message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_ChannelContentPersonalizeRequestParameters {
  msdynmkt_PersonalizeContentRequest: string;
}

/**
 * msdynmkt_ChannelContentPersonalize request message
 *
 * Web API Action: msdynmkt_ChannelContentPersonalize
 */
export class msdynmkt_ChannelContentPersonalizeRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_ChannelContentPersonalizeResponse>
{
  declare readonly Parameters: Readonly<msdynmkt_ChannelContentPersonalizeRequestParameters>;

  constructor(parameters: msdynmkt_ChannelContentPersonalizeRequestParameters) {
    super("msdynmkt_ChannelContentPersonalize", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_ChannelContentPersonalize`;

    const body = requestBody({
      msdynmkt_PersonalizeContentRequest: this.Parameters.msdynmkt_PersonalizeContentRequest,
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

  async parseResponse(response: Response): Promise<msdynmkt_ChannelContentPersonalizeResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdynmkt_ChannelContentPersonalizeResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdynmkt_ChannelContentPersonalize response message
 */
export class msdynmkt_ChannelContentPersonalizeResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_ChannelContentPersonalizeResponseData) {
    super("msdynmkt_ChannelContentPersonalize");
  }

  static fromResponse(data: unknown): msdynmkt_ChannelContentPersonalizeResponse {
    return new msdynmkt_ChannelContentPersonalizeResponse(
      responseObject<msdynmkt_ChannelContentPersonalizeResponseData>(data)
    );
  }
}
