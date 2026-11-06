import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_CheckForPendingProcesses action
 */
export interface msdyn_CheckForPendingProcessesResponse {
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
  ReturnSeverity: number;
  ReturnLevel: number;
}

/**
 * Parameters of the msdyn_CheckForPendingProcesses action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckForPendingProcessesActionParameters {
  SolutionId?: string;
}

/**
 * msdyn_CheckForPendingProcesses action
 *
 * Unbound action
 */
export class msdyn_CheckForPendingProcessesAction implements Executable<msdyn_CheckForPendingProcessesResponse> {
  constructor(public readonly parameters: msdyn_CheckForPendingProcessesActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForPendingProcesses`;

    const body = requestBody({
      SolutionId: this.parameters.SolutionId,
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

  async parseResponse(response: Response): Promise<msdyn_CheckForPendingProcessesResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_CheckForPendingProcessesResponse;
    return (await response.json()) as msdyn_CheckForPendingProcessesResponse;
  }
}
