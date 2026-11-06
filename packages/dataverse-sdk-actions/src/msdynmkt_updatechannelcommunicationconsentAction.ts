import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdynmkt_updatechannelcommunicationconsent action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdynmkt_updatechannelcommunicationconsentResponse = void;

/**
 * Parameters of the msdynmkt_updatechannelcommunicationconsent action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_updatechannelcommunicationconsentActionParameters {
  msdynmkt_topicid?: string;
  msdynmkt_contactpoint: string;
  msdynmkt_channeltype: string;
  msdynmkt_purposeid: string;
  msdynmkt_compliancesettingsid: string;
  msdynmkt_value: string;
}

/**
 * msdynmkt_updatechannelcommunicationconsent action
 *
 * Unbound action
 */
export class msdynmkt_updatechannelcommunicationconsentAction implements Executable<msdynmkt_updatechannelcommunicationconsentResponse> {
  constructor(
    public readonly parameters: msdynmkt_updatechannelcommunicationconsentActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_updatechannelcommunicationconsent`;

    const body = requestBody({
      msdynmkt_topicid: this.parameters.msdynmkt_topicid,
      msdynmkt_contactpoint: this.parameters.msdynmkt_contactpoint,
      msdynmkt_channeltype: this.parameters.msdynmkt_channeltype,
      msdynmkt_purposeid: this.parameters.msdynmkt_purposeid,
      msdynmkt_compliancesettingsid: this.parameters.msdynmkt_compliancesettingsid,
      msdynmkt_value: this.parameters.msdynmkt_value,
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
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
