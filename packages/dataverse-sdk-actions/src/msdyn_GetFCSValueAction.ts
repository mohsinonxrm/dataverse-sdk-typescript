import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetFCSValue action
 */
export interface msdyn_GetFCSValueResponse {
  Value: boolean;
}

/**
 * Parameters of the msdyn_GetFCSValue action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetFCSValueActionParameters {
  Key: string;
  Namespace: string;
}

/**
 * msdyn_GetFCSValue action
 *
 * Unbound action
 */
export class msdyn_GetFCSValueAction implements Executable<msdyn_GetFCSValueResponse> {
  constructor(public readonly parameters: msdyn_GetFCSValueActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetFCSValue`;

    const body = requestBody({
      Key: this.parameters.Key,
      Namespace: this.parameters.Namespace,
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

  async parseResponse(response: Response): Promise<msdyn_GetFCSValueResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_GetFCSValueResponse;
  }
}
