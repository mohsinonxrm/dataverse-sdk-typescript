import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_FieldServiceSystemAction action
 */
export interface msdyn_FieldServiceSystemActionResponse {
  OutputParameter: string;
}

/**
 * Parameters of the msdyn_FieldServiceSystemAction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_FieldServiceSystemActionActionParameters {
  Type: number;
  InputParameter: string;
}

/**
 * msdyn_FieldServiceSystemAction action
 *
 * Unbound action
 */
export class msdyn_FieldServiceSystemActionAction implements Executable<msdyn_FieldServiceSystemActionResponse> {
  constructor(public readonly parameters: msdyn_FieldServiceSystemActionActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_FieldServiceSystemAction`;

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

  async parseResponse(response: Response): Promise<msdyn_FieldServiceSystemActionResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_FieldServiceSystemActionResponse;
  }
}
