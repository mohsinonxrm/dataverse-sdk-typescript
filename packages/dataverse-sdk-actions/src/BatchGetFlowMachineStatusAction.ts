import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from BatchGetFlowMachineStatus action
 */
export interface BatchGetFlowMachineStatusResponse {
  machineStatuses: string;
}

/**
 * BatchGetFlowMachineStatus action
 *
 * Unbound action
 */
export class BatchGetFlowMachineStatusAction implements Executable<BatchGetFlowMachineStatusResponse> {
  constructor(
    public readonly machineIds: string,
    public readonly version?: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/BatchGetFlowMachineStatus`;

    const body: Record<string, unknown> = {
      machineIds: this.machineIds,
      version: this.version,
    };

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
    const data = await response.json();
    return data as BatchGetFlowMachineStatusResponse;
  }
}
