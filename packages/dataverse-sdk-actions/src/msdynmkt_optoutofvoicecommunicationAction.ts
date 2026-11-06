import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdynmkt_optoutofvoicecommunication action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdynmkt_optoutofvoicecommunicationResponse = void;

/**
 * Parameters of the msdynmkt_optoutofvoicecommunication action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_optoutofvoicecommunicationActionParameters {
  msdynmkt_trackingcontextid: string;
}

/**
 * msdynmkt_optoutofvoicecommunication action
 *
 * Unbound action
 */
export class msdynmkt_optoutofvoicecommunicationAction implements Executable<msdynmkt_optoutofvoicecommunicationResponse> {
  constructor(public readonly parameters: msdynmkt_optoutofvoicecommunicationActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_optoutofvoicecommunication`;

    const body = requestBody({
      msdynmkt_trackingcontextid: this.parameters.msdynmkt_trackingcontextid,
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

  parseResponse(_response: Response): Promise<msdynmkt_optoutofvoicecommunicationResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
