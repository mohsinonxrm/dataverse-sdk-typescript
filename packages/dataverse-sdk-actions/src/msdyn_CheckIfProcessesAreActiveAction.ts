import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CheckIfProcessesAreActive action
 */
export interface msdyn_CheckIfProcessesAreActiveResponse {
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
  ReturnSeverity: number;
  ReturnLevel: number;
  HelpLink: string;
}

/**
 * msdyn_CheckIfProcessesAreActive action
 *
 * Unbound action
 */
export class msdyn_CheckIfProcessesAreActiveAction implements Executable<msdyn_CheckIfProcessesAreActiveResponse> {
  constructor(
    public readonly entityIds: string,
    public readonly solutionId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckIfProcessesAreActive`;

    const body: Record<string, unknown> = {
      EntityIds: this.entityIds,
      SolutionId: this.solutionId,
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

  async parseResponse(response: Response): Promise<msdyn_CheckIfProcessesAreActiveResponse> {
    const data = await response.json();
    return data as msdyn_CheckIfProcessesAreActiveResponse;
  }
}
