import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdynmkt_getsuppressionlistentries action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdynmkt_getsuppressionlistentriesResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdynmkt_getsuppressionlistentriesResponse;
  }
}
