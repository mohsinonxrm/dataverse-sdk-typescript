import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdynmkt_removesuppressionlistentry action
 */
export interface msdynmkt_removesuppressionlistentryResponse {
  msdynmkt_removesuppressionlistentryresponse: string;
}

/**
 * Parameters of the msdynmkt_removesuppressionlistentry action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_removesuppressionlistentryActionParameters {
  msdynmkt_emailaddress: string;
}

/**
 * msdynmkt_removesuppressionlistentry action
 *
 * Unbound action
 */
export class msdynmkt_removesuppressionlistentryAction implements Executable<msdynmkt_removesuppressionlistentryResponse> {
  constructor(public readonly parameters: msdynmkt_removesuppressionlistentryActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_removesuppressionlistentry`;

    const body = requestBody({
      msdynmkt_emailaddress: this.parameters.msdynmkt_emailaddress,
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

  async parseResponse(response: Response): Promise<msdynmkt_removesuppressionlistentryResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdynmkt_removesuppressionlistentryResponse;
  }
}
