import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the RestartHostedMachine action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type RestartHostedMachineResponse = void;

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
    const url = `${baseUrl}/flowmachines(${odataLiteral.guid(this.flowmachineId)})/Microsoft.Dynamics.CRM.RestartHostedMachine`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  parseResponse(_response: Response): Promise<RestartHostedMachineResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
