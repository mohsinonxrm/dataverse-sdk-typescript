import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdynmkt_optoutofallchannelcommunication message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_optoutofallchannelcommunicationRequestParameters {
  msdynmkt_channeltype: string;
  msdynmkt_correlationid?: string;
  msdynmkt_contactpointvalue: string;
}

/**
 * msdynmkt_optoutofallchannelcommunication request message
 *
 * Web API Action: msdynmkt_optoutofallchannelcommunication
 */
export class msdynmkt_optoutofallchannelcommunicationRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_optoutofallchannelcommunicationResponse>
{
  declare readonly Parameters: Readonly<msdynmkt_optoutofallchannelcommunicationRequestParameters>;

  constructor(parameters: msdynmkt_optoutofallchannelcommunicationRequestParameters) {
    super("msdynmkt_optoutofallchannelcommunication", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_optoutofallchannelcommunication`;

    const body = requestBody({
      msdynmkt_channeltype: this.Parameters.msdynmkt_channeltype,
      msdynmkt_correlationid: this.Parameters.msdynmkt_correlationid,
      msdynmkt_contactpointvalue: this.Parameters.msdynmkt_contactpointvalue,
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
  ): Promise<msdynmkt_optoutofallchannelcommunicationResponse> {
    // No return value (204 No Content)
    return new msdynmkt_optoutofallchannelcommunicationResponse();
  }
}

/**
 * msdynmkt_optoutofallchannelcommunication response message
 */
export class msdynmkt_optoutofallchannelcommunicationResponse extends OrganizationResponse {
  constructor() {
    super("msdynmkt_optoutofallchannelcommunication");
  }

  static fromResponse(_data: unknown): msdynmkt_optoutofallchannelcommunicationResponse {
    return new msdynmkt_optoutofallchannelcommunicationResponse();
  }
}
