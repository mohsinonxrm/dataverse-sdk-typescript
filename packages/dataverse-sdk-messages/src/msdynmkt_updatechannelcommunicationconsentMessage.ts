import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdynmkt_updatechannelcommunicationconsent message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_updatechannelcommunicationconsentRequestParameters {
  msdynmkt_topicid?: string;
  msdynmkt_contactpoint: string;
  msdynmkt_channeltype: string;
  msdynmkt_purposeid: string;
  msdynmkt_compliancesettingsid: string;
  msdynmkt_value: string;
}

/**
 * msdynmkt_updatechannelcommunicationconsent request message
 *
 * Web API Action: msdynmkt_updatechannelcommunicationconsent
 */
export class msdynmkt_updatechannelcommunicationconsentRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_updatechannelcommunicationconsentResponse>
{
  declare readonly Parameters: Readonly<msdynmkt_updatechannelcommunicationconsentRequestParameters>;

  constructor(parameters: msdynmkt_updatechannelcommunicationconsentRequestParameters) {
    super("msdynmkt_updatechannelcommunicationconsent", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_updatechannelcommunicationconsent`;

    const body = requestBody({
      msdynmkt_topicid: this.Parameters.msdynmkt_topicid,
      msdynmkt_contactpoint: this.Parameters.msdynmkt_contactpoint,
      msdynmkt_channeltype: this.Parameters.msdynmkt_channeltype,
      msdynmkt_purposeid: this.Parameters.msdynmkt_purposeid,
      msdynmkt_compliancesettingsid: this.Parameters.msdynmkt_compliancesettingsid,
      msdynmkt_value: this.Parameters.msdynmkt_value,
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

  parseResponse(_response: Response): Promise<msdynmkt_updatechannelcommunicationconsentResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdynmkt_updatechannelcommunicationconsentResponse());
  }
}

/**
 * msdynmkt_updatechannelcommunicationconsent response message
 */
export class msdynmkt_updatechannelcommunicationconsentResponse extends OrganizationResponse {
  constructor() {
    super("msdynmkt_updatechannelcommunicationconsent");
  }

  static fromResponse(_data?: unknown): msdynmkt_updatechannelcommunicationconsentResponse {
    return new msdynmkt_updatechannelcommunicationconsentResponse();
  }
}
