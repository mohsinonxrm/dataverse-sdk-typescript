import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from BatchGetFlowMachineStatus action
 */
export interface BatchGetFlowMachineStatusResponse {
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as BatchGetFlowMachineStatusResponse;
  }
}
