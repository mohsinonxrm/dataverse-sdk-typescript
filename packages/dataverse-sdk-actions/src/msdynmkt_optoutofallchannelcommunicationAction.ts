import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdynmkt_optoutofallchannelcommunication action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdynmkt_optoutofallchannelcommunicationResponse = void;

/**
 * Parameters of the msdynmkt_optoutofallchannelcommunication action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_optoutofallchannelcommunicationActionParameters {
  msdynmkt_channeltype: string;
  msdynmkt_correlationid?: string;
  msdynmkt_contactpointvalue: string;
}

/**
 * msdynmkt_optoutofallchannelcommunication action
 *
 * Unbound action
 */
export class msdynmkt_optoutofallchannelcommunicationAction implements Executable<msdynmkt_optoutofallchannelcommunicationResponse> {
  constructor(
    public readonly parameters: msdynmkt_optoutofallchannelcommunicationActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_optoutofallchannelcommunication`;

    const body = requestBody({
      msdynmkt_channeltype: this.parameters.msdynmkt_channeltype,
      msdynmkt_correlationid: this.parameters.msdynmkt_correlationid,
      msdynmkt_contactpointvalue: this.parameters.msdynmkt_contactpointvalue,
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

  parseResponse(_response: Response): Promise<msdynmkt_optoutofallchannelcommunicationResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
