import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CheckForDeletedWebResources action
 */
export interface msdyn_CheckForDeletedWebResourcesResponse {
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
  HelpLink: string;
}

/**
 * msdyn_CheckForDeletedWebResources action
 *
 * Unbound action
 */
export class msdyn_CheckForDeletedWebResourcesAction implements Executable<msdyn_CheckForDeletedWebResourcesResponse> {
  constructor(
    public readonly entityIds?: string,
    public readonly solutionId?: string,
    public readonly excludeSolutionIds?: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForDeletedWebResources`;

    const body: Record<string, unknown> = {
      EntityIds: this.entityIds,
      SolutionId: this.solutionId,
      ExcludeSolutionIds: this.excludeSolutionIds,
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

  async parseResponse(response: Response): Promise<msdyn_CheckForDeletedWebResourcesResponse> {
    const data = await response.json();
    return data as msdyn_CheckForDeletedWebResourcesResponse;
  }
}
