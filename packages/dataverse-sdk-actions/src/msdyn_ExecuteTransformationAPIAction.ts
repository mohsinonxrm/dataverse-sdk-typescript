import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_ExecuteTransformationAPI action
 */
export interface msdyn_ExecuteTransformationAPIResponse {
  ApiResponse: string;
}

/**
 * Parameters of the msdyn_ExecuteTransformationAPI action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ExecuteTransformationAPIActionParameters {
  ApiName: string;
  ApiPayload: string;
}

/**
 * msdyn_ExecuteTransformationAPI action
 *
 * Unbound action
 */
export class msdyn_ExecuteTransformationAPIAction implements Executable<msdyn_ExecuteTransformationAPIResponse> {
  constructor(public readonly parameters: msdyn_ExecuteTransformationAPIActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ExecuteTransformationAPI`;

    const body = requestBody({
      ApiName: this.parameters.ApiName,
      ApiPayload: this.parameters.ApiPayload,
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

  async parseResponse(response: Response): Promise<msdyn_ExecuteTransformationAPIResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_ExecuteTransformationAPIResponse;
    return (await response.json()) as msdyn_ExecuteTransformationAPIResponse;
  }
}
