import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdynmkt_getsuppressionlistentries action
 */
export interface msdynmkt_getsuppressionlistentriesResponse {
  msdynmkt_getsuppressionlistentriesresponse: string;
}

/**
 * Parameters of the msdynmkt_getsuppressionlistentries action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_getsuppressionlistentriesActionParameters {
  msdynmkt_getsuppressionlistentriesemailaddresses: string;
}

/**
 * msdynmkt_getsuppressionlistentries action
 *
 * Unbound action
 */
export class msdynmkt_getsuppressionlistentriesAction implements Executable<msdynmkt_getsuppressionlistentriesResponse> {
  constructor(public readonly parameters: msdynmkt_getsuppressionlistentriesActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_getsuppressionlistentries`;

    const body = requestBody({
      msdynmkt_getsuppressionlistentriesemailaddresses:
        this.parameters.msdynmkt_getsuppressionlistentriesemailaddresses,
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

  async parseResponse(response: Response): Promise<msdynmkt_getsuppressionlistentriesResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdynmkt_getsuppressionlistentriesResponse;
  }
}
