import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_UpdateOrchestrationToggle action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_UpdateOrchestrationToggleResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_UpdateOrchestrationToggleResponse;
  }
}
