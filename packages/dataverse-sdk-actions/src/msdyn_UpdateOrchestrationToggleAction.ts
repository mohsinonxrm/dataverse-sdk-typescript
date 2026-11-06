import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_UpdateOrchestrationToggle action
 */
export interface msdyn_UpdateOrchestrationToggleResponse {
  ErrorMessage: string;
  Status: number;
}

/**
 * Parameters of the msdyn_UpdateOrchestrationToggle action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UpdateOrchestrationToggleActionParameters {
  IsEnabled: boolean;
}

/**
 * msdyn_UpdateOrchestrationToggle action
 *
 * Unbound action
 */
export class msdyn_UpdateOrchestrationToggleAction implements Executable<msdyn_UpdateOrchestrationToggleResponse> {
  constructor(public readonly parameters: msdyn_UpdateOrchestrationToggleActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateOrchestrationToggle`;

    const body = requestBody({
      IsEnabled: this.parameters.IsEnabled,
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

  async parseResponse(response: Response): Promise<msdyn_UpdateOrchestrationToggleResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_UpdateOrchestrationToggleResponse;
    return (await response.json()) as msdyn_UpdateOrchestrationToggleResponse;
  }
}
