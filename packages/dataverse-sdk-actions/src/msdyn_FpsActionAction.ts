import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_FpsAction action
 */
export interface msdyn_FpsActionResponse {
  OutputParameter: string;
}

/**
 * Parameters of the msdyn_FpsAction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_FpsActionActionParameters {
  Type: number;
  InputParameter?: string;
}

/**
 * msdyn_FpsAction action
 *
 * Unbound action
 */
export class msdyn_FpsActionAction implements Executable<msdyn_FpsActionResponse> {
  constructor(public readonly parameters: msdyn_FpsActionActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_FpsAction`;

    const body = requestBody({
      Type: this.parameters.Type,
      InputParameter: this.parameters.InputParameter,
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

  async parseResponse(response: Response): Promise<msdyn_FpsActionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_FpsActionResponse;
    return (await response.json()) as msdyn_FpsActionResponse;
  }
}
