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
 *
 * The first argument is the id of the flowmachine record to call it on.
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
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RestartHostedMachineResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as RestartHostedMachineResponse;
  }
}
