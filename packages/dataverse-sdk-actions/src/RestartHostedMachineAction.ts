import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from RestartHostedMachine action
 */
export interface RestartHostedMachineResponse {
  // No content returned
}

/**
 * RestartHostedMachine action
 *
 * Bound action
 * Binding parameter: entity (mscrm.flowmachine)
 */
export class RestartHostedMachineAction implements Executable<RestartHostedMachineResponse> {
  constructor(public readonly flowmachineId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/flowmachines(${this.flowmachineId})/Microsoft.Dynamics.CRM.RestartHostedMachine`;

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RestartHostedMachineResponse> {
    // No return value (204 No Content)
    return {};
  }
}
