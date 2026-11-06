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
  msdyn_linkedactivityid?: string;
  msdyn_sequencetargetstepid: string;
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
      msdyn_linkedactivityid: this.parameters.msdyn_linkedactivityid,
      msdyn_sequencetargetstepid: this.parameters.msdyn_sequencetargetstepid,
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_updatesequencetargetstepdataResponse;
    return (await response.json()) as msdyn_updatesequencetargetstepdataResponse;
  }
}
