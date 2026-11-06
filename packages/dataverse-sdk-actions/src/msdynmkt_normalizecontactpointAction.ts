import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdynmkt_normalizecontactpoint action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdynmkt_normalizecontactpointResponse {
  "@odata.context"?: string;
  msdynmkt_normalizedcontactpointvalue: string;
}

/**
 * Parameters of the msdynmkt_normalizecontactpoint action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_normalizecontactpointActionParameters {
  msdynmkt_contactpointvalue: string;
  msdynmkt_contactpointtype: number;
}

/**
 * msdynmkt_normalizecontactpoint action
 *
 * Unbound action
 */
export class msdynmkt_normalizecontactpointAction implements Executable<msdynmkt_normalizecontactpointResponse> {
  constructor(public readonly parameters: msdynmkt_normalizecontactpointActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_normalizecontactpoint`;

    const body = requestBody({
      msdynmkt_contactpointvalue: this.parameters.msdynmkt_contactpointvalue,
      msdynmkt_contactpointtype: this.parameters.msdynmkt_contactpointtype,
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

  async parseResponse(response: Response): Promise<msdynmkt_normalizecontactpointResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdynmkt_normalizecontactpointResponse;
  }
}
