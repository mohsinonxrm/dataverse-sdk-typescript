import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetBoolFCSValue action
 */
export interface msdyn_GetBoolFCSValueResponse {
  msdyn_BoolFCSValue: string;
}

/**
 * Parameters of the msdyn_GetBoolFCSValue action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetBoolFCSValueActionParameters {
  msdyn_BoolFCSKey: string;
  msdyn_BoolFCSNamespace: string;
}

/**
 * msdyn_GetBoolFCSValue action
 *
 * Unbound action
 */
export class msdyn_GetBoolFCSValueAction implements Executable<msdyn_GetBoolFCSValueResponse> {
  constructor(public readonly parameters: msdyn_GetBoolFCSValueActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetBoolFCSValue`;

    const body = requestBody({
      msdyn_BoolFCSKey: this.parameters.msdyn_BoolFCSKey,
      msdyn_BoolFCSNamespace: this.parameters.msdyn_BoolFCSNamespace,
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

  async parseResponse(response: Response): Promise<msdyn_GetBoolFCSValueResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_GetBoolFCSValueResponse;
  }
}
