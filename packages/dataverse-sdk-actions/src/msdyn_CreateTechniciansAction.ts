import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_CreateTechnicians action
 */
export interface msdyn_CreateTechniciansResponse {
  output: string;
}

/**
 * Parameters of the msdyn_CreateTechnicians action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CreateTechniciansActionParameters {
  input: string;
}

/**
 * msdyn_CreateTechnicians action
 *
 * Unbound action
 */
export class msdyn_CreateTechniciansAction implements Executable<msdyn_CreateTechniciansResponse> {
  constructor(public readonly parameters: msdyn_CreateTechniciansActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateTechnicians`;

    const body = requestBody({
      input: this.parameters.input,
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

  async parseResponse(response: Response): Promise<msdyn_CreateTechniciansResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_CreateTechniciansResponse;
  }
}
