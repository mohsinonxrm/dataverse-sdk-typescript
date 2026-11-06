import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
 * msdyn_CheckForPendingProcesses action
 *
 * Unbound action
 */
export class msdyn_CheckForPendingProcessesAction implements Executable<msdyn_CheckForPendingProcessesResponse> {
  constructor(public readonly solutionId?: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForPendingProcesses`;

    const body: Record<string, unknown> = {
      SolutionId: this.solutionId,
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

  async parseResponse(response: Response): Promise<msdyn_CheckForPendingProcessesResponse> {
    const data = await response.json();
    return data as msdyn_CheckForPendingProcessesResponse;
  }
}
