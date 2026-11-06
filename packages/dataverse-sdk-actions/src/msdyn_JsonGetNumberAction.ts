import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_JsonGetNumber action
 */
export interface msdyn_JsonGetNumberResponse {
  Value: number;
}

/**
 * Parameters of the msdyn_JsonGetNumber action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_JsonGetNumberActionParameters {
  Json?: string;
  PropertyPath: string;
  DefaultReturnValue?: number;
}

/**
 * msdyn_JsonGetNumber action
 *
 * Unbound action
 */
export class msdyn_JsonGetNumberAction implements Executable<msdyn_JsonGetNumberResponse> {
  constructor(public readonly parameters: msdyn_JsonGetNumberActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_JsonGetNumber`;

    const body = requestBody({
      Json: this.parameters.Json,
      PropertyPath: this.parameters.PropertyPath,
      DefaultReturnValue: this.parameters.DefaultReturnValue,
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

  async parseResponse(response: Response): Promise<msdyn_JsonGetNumberResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_JsonGetNumberResponse;
    return (await response.json()) as msdyn_JsonGetNumberResponse;
  }
}
