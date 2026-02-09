import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CheckForActiveLayersOnProcesses action
 */
export interface msdyn_CheckForActiveLayersOnProcessesResponse {
  Message: string;
  ReturnStatus: number;
  ResultEntities: string;
}

/**
 * msdyn_CheckForActiveLayersOnProcesses action
 *
 * Unbound action
 */
export class msdyn_CheckForActiveLayersOnProcessesAction implements Executable<msdyn_CheckForActiveLayersOnProcessesResponse> {
  constructor(
    public readonly solutionId: string,
    public readonly excludeFormIds: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForActiveLayersOnProcesses`;

    const body: Record<string, unknown> = {
      SolutionId: this.solutionId,
      ExcludeFormIds: this.excludeFormIds,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CheckForActiveLayersOnProcessesResponse> {
    const data = await response.json();
    return data as msdyn_CheckForActiveLayersOnProcessesResponse;
  }
}
