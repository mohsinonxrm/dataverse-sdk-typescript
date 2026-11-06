import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdynmkt_getsuppressionlistentry action
 */
export interface msdynmkt_getsuppressionlistentryResponse {
  msdynmkt_getsuppressionlistentryresponse: string;
}

/**
 * Parameters of the msdynmkt_getsuppressionlistentry action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_getsuppressionlistentryActionParameters {
  msdynmkt_emailaddress: string;
}

/**
 * msdynmkt_getsuppressionlistentry action
 *
 * Unbound action
 */
export class msdynmkt_getsuppressionlistentryAction implements Executable<msdynmkt_getsuppressionlistentryResponse> {
  constructor(public readonly parameters: msdynmkt_getsuppressionlistentryActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_getsuppressionlistentry`;

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

  async parseResponse(response: Response): Promise<msdynmkt_getsuppressionlistentryResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdynmkt_getsuppressionlistentryResponse;
  }
}
