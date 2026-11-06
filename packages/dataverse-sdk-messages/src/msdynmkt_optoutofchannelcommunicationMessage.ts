import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdynmkt_optoutofchannelcommunication message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_optoutofchannelcommunicationRequestParameters {
  msdynmkt_trackingcontextid: string;
  msdynmkt_channeltype: string;
}

/**
 * msdynmkt_optoutofchannelcommunication request message
 *
 * Web API Action: msdynmkt_optoutofchannelcommunication
 */
export class msdynmkt_optoutofchannelcommunicationRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_optoutofchannelcommunicationResponse>
{
  declare readonly Parameters: Readonly<msdynmkt_optoutofchannelcommunicationRequestParameters>;

  constructor(parameters: msdynmkt_optoutofchannelcommunicationRequestParameters) {
    super("msdynmkt_optoutofchannelcommunication", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_optoutofchannelcommunication`;

    const body = requestBody({
      msdynmkt_trackingcontextid: this.Parameters.msdynmkt_trackingcontextid,
      msdynmkt_channeltype: this.Parameters.msdynmkt_channeltype,
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

  parseResponse(_response: Response): Promise<msdynmkt_optoutofchannelcommunicationResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdynmkt_optoutofchannelcommunicationResponse());
  }
}

/**
 * msdynmkt_optoutofchannelcommunication response message
 */
export class msdynmkt_optoutofchannelcommunicationResponse extends OrganizationResponse {
  constructor() {
    super("msdynmkt_optoutofchannelcommunication");
  }

  static fromResponse(_data?: unknown): msdynmkt_optoutofchannelcommunicationResponse {
    return new msdynmkt_optoutofchannelcommunicationResponse();
  }
}
