import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_CheckForActiveLayersOnProcesses action
 */
export interface msdyn_CheckForActiveLayersOnProcessesResponse {
  Message: string;
  ReturnStatus: number;
  ResultEntities: string;
}

/**
 * Parameters of the msdyn_CheckForActiveLayersOnProcesses action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckForActiveLayersOnProcessesActionParameters {
  SolutionId: string;
  ExcludeFormIds: string;
}

/**
 * msdyn_CheckForActiveLayersOnProcesses action
 *
 * Unbound action
 */
export class msdyn_CheckForActiveLayersOnProcessesAction implements Executable<msdyn_CheckForActiveLayersOnProcessesResponse> {
  constructor(public readonly parameters: msdyn_CheckForActiveLayersOnProcessesActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForActiveLayersOnProcesses`;

    const body = requestBody({
      SolutionId: this.parameters.SolutionId,
      ExcludeFormIds: this.parameters.ExcludeFormIds,
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

  async parseResponse(response: Response): Promise<msdyn_CheckForActiveLayersOnProcessesResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_CheckForActiveLayersOnProcessesResponse;
  }
}
