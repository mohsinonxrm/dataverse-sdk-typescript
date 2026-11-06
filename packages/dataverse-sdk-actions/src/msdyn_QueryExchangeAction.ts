import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_QueryExchange action
 */
export interface msdyn_QueryExchangeResponse {
  ExchangeData: string;
}

/**
 * Parameters of the msdyn_QueryExchange action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_QueryExchangeActionParameters {
  method: string;
  body: string;
  requesturl: string;
}

/**
 * msdyn_QueryExchange action
 *
 * Unbound action
 */
export class msdyn_QueryExchangeAction implements Executable<msdyn_QueryExchangeResponse> {
  constructor(public readonly parameters: msdyn_QueryExchangeActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_QueryExchange`;

    const body = requestBody({
      method: this.parameters.method,
      body: this.parameters.body,
      requesturl: this.parameters.requesturl,
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

  async parseResponse(response: Response): Promise<msdyn_QueryExchangeResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_QueryExchangeResponse;
  }
}
