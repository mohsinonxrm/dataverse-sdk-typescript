import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetCustomActionParameters action
 */
export interface msdyn_GetCustomActionParametersResponse {
  dynamicSchema: string;
}

/**
 * Parameters of the msdyn_GetCustomActionParameters action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetCustomActionParametersActionParameters {
  workflowId: string;
  customAction: string;
  correlationId: string;
}

/**
 * msdyn_GetCustomActionParameters action
 *
 * Unbound action
 */
export class msdyn_GetCustomActionParametersAction implements Executable<msdyn_GetCustomActionParametersResponse> {
  constructor(public readonly parameters: msdyn_GetCustomActionParametersActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetCustomActionParameters`;

    const body = requestBody({
      workflowId: this.parameters.workflowId,
      customAction: this.parameters.customAction,
      correlationId: this.parameters.correlationId,
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

  async parseResponse(response: Response): Promise<msdyn_GetCustomActionParametersResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GetCustomActionParametersResponse;
    return (await response.json()) as msdyn_GetCustomActionParametersResponse;
  }
}
