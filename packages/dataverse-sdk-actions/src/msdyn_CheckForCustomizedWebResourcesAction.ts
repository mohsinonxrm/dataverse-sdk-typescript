import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CheckForCustomizedWebResources action
 */
export interface msdyn_CheckForCustomizedWebResourcesResponse {
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
  ReturnSeverity: number;
  ReturnLevel: number;
  HelpLink: string;
}

/**
 * msdyn_CheckForCustomizedWebResources action
 *
 * Unbound action
 */
export class msdyn_CheckForCustomizedWebResourcesAction implements Executable<msdyn_CheckForCustomizedWebResourcesResponse> {
  constructor(
    public readonly entityIds: string,
    public readonly solutionId: string,
    public readonly excludeSolutionIds: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForCustomizedWebResources`;

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

  async parseResponse(response: Response): Promise<msdyn_CheckForCustomizedWebResourcesResponse> {
    const data = await response.json();
    return data as msdyn_CheckForCustomizedWebResourcesResponse;
  }
}
