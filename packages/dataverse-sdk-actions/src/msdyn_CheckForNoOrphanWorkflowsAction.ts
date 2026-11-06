import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CheckForNoOrphanWorkflows action
 */
export interface msdyn_CheckForNoOrphanWorkflowsResponse {
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
  ReturnSeverity: number;
  ReturnLevel: number;
}

/**
 * msdyn_CheckForNoOrphanWorkflows action
 *
 * Unbound action
 */
export class msdyn_CheckForNoOrphanWorkflowsAction implements Executable<msdyn_CheckForNoOrphanWorkflowsResponse> {
  constructor(public readonly solutionId?: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForNoOrphanWorkflows`;

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

  async parseResponse(response: Response): Promise<msdyn_CheckForNoOrphanWorkflowsResponse> {
    const data = await response.json();
    return data as msdyn_CheckForNoOrphanWorkflowsResponse;
  }
}
