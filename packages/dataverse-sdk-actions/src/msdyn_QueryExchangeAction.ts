import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_QueryExchange action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_QueryExchangeResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_QueryExchangeResponse;
  }
}
