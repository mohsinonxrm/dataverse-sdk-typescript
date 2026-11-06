import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdynmkt_optoutofvoicecommunication action
 */
export interface msdynmkt_optoutofvoicecommunicationResponse {
  // No content returned
}

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

  async parseResponse(response: Response): Promise<msdynmkt_optoutofvoicecommunicationResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdynmkt_optoutofvoicecommunicationResponse;
    return (await response.json()) as msdynmkt_optoutofvoicecommunicationResponse;
  }
}
