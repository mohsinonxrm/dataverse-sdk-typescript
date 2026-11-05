import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdynmkt_ChannelContentPersonalize request message
 *
 * Web API Action: msdynmkt_ChannelContentPersonalize
 */
export class msdynmkt_ChannelContentPersonalizeRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_ChannelContentPersonalizeResponse>
{
  constructor(public msdynmkt_PersonalizeContentRequest: string) {
    super("msdynmkt_ChannelContentPersonalize");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_ChannelContentPersonalize`;

    const body: Record<string, unknown> = {
      msdynmkt_PersonalizeContentRequest: this.msdynmkt_PersonalizeContentRequest,
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

  async parseResponse(response: Response): Promise<msdynmkt_ChannelContentPersonalizeResponse> {
    const data = await response.json();
    return msdynmkt_ChannelContentPersonalizeResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdynmkt_PersonalizeContentRequest: this.msdynmkt_PersonalizeContentRequest,
    };
  }
}

/**
 * msdynmkt_ChannelContentPersonalize response message
 */
export class msdynmkt_ChannelContentPersonalizeResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_ChannelContentPersonalizeResponse) {
    super("msdynmkt_ChannelContentPersonalize");
  }

  static fromResponse(data: unknown): msdynmkt_ChannelContentPersonalizeResponse {
    return new msdynmkt_ChannelContentPersonalizeResponse((data as any).value);
  }
}
