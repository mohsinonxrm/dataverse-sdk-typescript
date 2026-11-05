import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CheckForCustomizedAppModule action
 */
export interface msdyn_CheckForCustomizedAppModuleResponse {
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
  ReturnSeverity: number;
  ReturnLevel: number;
}

/**
 * msdyn_CheckForCustomizedAppModule action
 *
 * Unbound action
 */
export class msdyn_CheckForCustomizedAppModuleAction implements Executable<msdyn_CheckForCustomizedAppModuleResponse> {
  constructor(
    public readonly entityIds: string,
    public readonly solutionId: string,
    public readonly excludeSolutionIds: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForCustomizedAppModule`;

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

  async parseResponse(response: Response): Promise<msdyn_CheckForCustomizedAppModuleResponse> {
    const data = await response.json();
    return data as msdyn_CheckForCustomizedAppModuleResponse;
  }
}
