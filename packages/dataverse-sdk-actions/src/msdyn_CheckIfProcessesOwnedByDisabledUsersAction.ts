import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CheckIfProcessesOwnedByDisabledUsers action
 */
export interface msdyn_CheckIfProcessesOwnedByDisabledUsersResponse {
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
  ReturnSeverity: number;
  ReturnLevel: number;
  HelpLink: string;
}

/**
 * msdyn_CheckIfProcessesOwnedByDisabledUsers action
 *
 * Unbound action
 */
export class msdyn_CheckIfProcessesOwnedByDisabledUsersAction implements Executable<msdyn_CheckIfProcessesOwnedByDisabledUsersResponse> {
  constructor(public readonly solutionId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckIfProcessesOwnedByDisabledUsers`;

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

  async parseResponse(
    response: Response
  ): Promise<msdyn_CheckIfProcessesOwnedByDisabledUsersResponse> {
    const data = await response.json();
    return data as msdyn_CheckIfProcessesOwnedByDisabledUsersResponse;
  }
}
