import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CheckForDeletedProcess action
 */
export interface msdyn_CheckForDeletedProcessResponse {
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
  HelpLink: string;
}

/**
 * msdyn_CheckForDeletedProcess action
 *
 * Unbound action
 */
export class msdyn_CheckForDeletedProcessAction implements Executable<msdyn_CheckForDeletedProcessResponse> {
  constructor(
    public readonly entityIds?: string,
    public readonly solutionId?: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForDeletedProcess`;

    const body: Record<string, unknown> = {
      EntityIds: this.entityIds,
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

  async parseResponse(response: Response): Promise<msdyn_CheckForDeletedProcessResponse> {
    const data = await response.json();
    return data as msdyn_CheckForDeletedProcessResponse;
  }
}
