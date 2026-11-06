import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_FetchFCSValue action
 */
export interface msdyn_FetchFCSValueResponse {
  Value: string;
}

/**
 * Parameters of the msdyn_FetchFCSValue action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_FetchFCSValueActionParameters {
  Namespace: string;
  Key: string;
}

/**
 * msdyn_FetchFCSValue action
 *
 * Unbound action
 */
export class msdyn_FetchFCSValueAction implements Executable<msdyn_FetchFCSValueResponse> {
  constructor(public readonly parameters: msdyn_FetchFCSValueActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_FetchFCSValue`;

    const body = requestBody({
      Namespace: this.parameters.Namespace,
      Key: this.parameters.Key,
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

  async parseResponse(response: Response): Promise<msdyn_FetchFCSValueResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_FetchFCSValueResponse;
  }
}
