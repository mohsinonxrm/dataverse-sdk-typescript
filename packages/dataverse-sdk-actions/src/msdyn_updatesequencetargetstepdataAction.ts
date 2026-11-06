import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_updatesequencetargetstepdata action
 */
export interface msdyn_updatesequencetargetstepdataResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_updatesequencetargetstepdata action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_updatesequencetargetstepdataActionParameters {
  msdyn_sequencetargetstepid: string;
  msdyn_linkedactivityid?: string;
}

/**
 * msdyn_updatesequencetargetstepdata action
 *
 * Unbound action
 */
export class msdyn_updatesequencetargetstepdataAction implements Executable<msdyn_updatesequencetargetstepdataResponse> {
  constructor(public readonly parameters: msdyn_updatesequencetargetstepdataActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_updatesequencetargetstepdata`;

    const body = requestBody({
      msdyn_sequencetargetstepid: this.parameters.msdyn_sequencetargetstepid,
      msdyn_linkedactivityid: this.parameters.msdyn_linkedactivityid,
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

  async parseResponse(response: Response): Promise<msdyn_updatesequencetargetstepdataResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_updatesequencetargetstepdataResponse;
  }
}
