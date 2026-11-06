import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdynmkt_getsuppressionlistentry action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdynmkt_getsuppressionlistentryResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdynmkt_getsuppressionlistentryResponse;
  }
}
