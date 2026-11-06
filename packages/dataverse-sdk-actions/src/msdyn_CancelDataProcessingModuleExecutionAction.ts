import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_CancelDataProcessingModuleExecution action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CancelDataProcessingModuleExecutionResponse {
  "@odata.context"?: string;
  Response: string;
}

/**
 * Parameters of the msdyn_CancelDataProcessingModuleExecution action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CancelDataProcessingModuleExecutionActionParameters {
  DataProcessingRequest: string;
}

/**
 * msdyn_CancelDataProcessingModuleExecution action
 *
 * Unbound action
 */
export class msdyn_CancelDataProcessingModuleExecutionAction implements Executable<msdyn_CancelDataProcessingModuleExecutionResponse> {
  constructor(
    public readonly parameters: msdyn_CancelDataProcessingModuleExecutionActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CancelDataProcessingModuleExecution`;

    const body = requestBody({
      DataProcessingRequest: this.parameters.DataProcessingRequest,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_CancelDataProcessingModuleExecutionResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_CancelDataProcessingModuleExecutionResponse;
  }
}
