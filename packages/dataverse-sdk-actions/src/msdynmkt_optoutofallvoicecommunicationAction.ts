import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdynmkt_optoutofallvoicecommunication action
 */
export interface msdynmkt_optoutofallvoicecommunicationResponse {
  // No content returned
}

/**
 * Parameters of the msdynmkt_optoutofallvoicecommunication action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_optoutofallvoicecommunicationActionParameters {
  msdynmkt_contactpointvalue: string;
  msdynmkt_correlationid?: string;
}

/**
 * msdynmkt_optoutofallvoicecommunication action
 *
 * Unbound action
 */
export class msdynmkt_optoutofallvoicecommunicationAction implements Executable<msdynmkt_optoutofallvoicecommunicationResponse> {
  constructor(public readonly parameters: msdynmkt_optoutofallvoicecommunicationActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_optoutofallvoicecommunication`;

    const body = requestBody({
      msdynmkt_contactpointvalue: this.parameters.msdynmkt_contactpointvalue,
      msdynmkt_correlationid: this.parameters.msdynmkt_correlationid,
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

  async parseResponse(response: Response): Promise<msdynmkt_optoutofallvoicecommunicationResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdynmkt_optoutofallvoicecommunicationResponse;
  }
}
