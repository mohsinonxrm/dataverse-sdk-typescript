import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_JsonGetBoolean action
 */
export interface msdyn_JsonGetBooleanResponse {
  Value: boolean;
}

/**
 * Parameters of the msdyn_JsonGetBoolean action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_JsonGetBooleanActionParameters {
  Json?: string;
  PropertyPath: string;
  DefaultReturnValue?: boolean;
}

/**
 * msdyn_JsonGetBoolean action
 *
 * Unbound action
 */
export class msdyn_JsonGetBooleanAction implements Executable<msdyn_JsonGetBooleanResponse> {
  constructor(public readonly parameters: msdyn_JsonGetBooleanActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_JsonGetBoolean`;

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

  async parseResponse(response: Response): Promise<msdyn_JsonGetBooleanResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_JsonGetBooleanResponse;
    return (await response.json()) as msdyn_JsonGetBooleanResponse;
  }
}
