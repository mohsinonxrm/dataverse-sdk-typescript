import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CheckForCustomizedOptionSet action
 */
export interface msdyn_CheckForCustomizedOptionSetResponse {
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
  ReturnSeverity: number;
  ReturnLevel: number;
  HelpLink: string;
}

/**
 * msdyn_CheckForCustomizedOptionSet action
 *
 * Unbound action
 */
export class msdyn_CheckForCustomizedOptionSetAction implements Executable<msdyn_CheckForCustomizedOptionSetResponse> {
  constructor(
    public readonly entityIds?: string,
    public readonly solutionId?: string,
    public readonly excludeSolutionIds?: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForCustomizedOptionSet`;

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

  async parseResponse(response: Response): Promise<msdyn_CheckForCustomizedOptionSetResponse> {
    const data = await response.json();
    return data as msdyn_CheckForCustomizedOptionSetResponse;
  }
}
