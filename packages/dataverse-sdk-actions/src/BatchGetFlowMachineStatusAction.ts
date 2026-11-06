import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the BatchGetFlowMachineStatus action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface BatchGetFlowMachineStatusResponse {
  "@odata.context"?: string;
  machineStatuses: string;
}

/**
 * Parameters of the BatchGetFlowMachineStatus action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface BatchGetFlowMachineStatusActionParameters {
  machineIds: string;
  version?: string;
}

/**
 * BatchGetFlowMachineStatus action
 *
 * Unbound action
 */
export class BatchGetFlowMachineStatusAction implements Executable<BatchGetFlowMachineStatusResponse> {
  constructor(public readonly parameters: BatchGetFlowMachineStatusActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/BatchGetFlowMachineStatus`;

    const body = requestBody({
      machineIds: this.parameters.machineIds,
      version: this.parameters.version,
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

  async parseResponse(response: Response): Promise<BatchGetFlowMachineStatusResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as BatchGetFlowMachineStatusResponse;
  }
}
