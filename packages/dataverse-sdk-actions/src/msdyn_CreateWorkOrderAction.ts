import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_CreateWorkOrder action
 */
export interface msdyn_CreateWorkOrderResponse {
  output: string;
}

/**
 * Parameters of the msdyn_CreateWorkOrder action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CreateWorkOrderActionParameters {
  input: string;
}

/**
 * msdyn_CreateWorkOrder action
 *
 * Unbound action
 */
export class msdyn_CreateWorkOrderAction implements Executable<msdyn_CreateWorkOrderResponse> {
  constructor(public readonly parameters: msdyn_CreateWorkOrderActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateWorkOrder`;

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

  async parseResponse(response: Response): Promise<msdyn_CreateWorkOrderResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_CreateWorkOrderResponse;
    return (await response.json()) as msdyn_CreateWorkOrderResponse;
  }
}
