import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdynmkt_normalizecontactpoint action
 */
export interface msdynmkt_normalizecontactpointResponse {
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdynmkt_normalizecontactpointResponse;
    return (await response.json()) as msdynmkt_normalizecontactpointResponse;
  }
}
