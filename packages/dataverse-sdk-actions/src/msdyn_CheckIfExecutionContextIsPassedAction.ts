import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CheckIfExecutionContextIsPassed action
 */
export interface msdyn_CheckIfExecutionContextIsPassedResponse {
  Message: string;
  ReturnStatus: number;
  ResultEntities: string;
  HelpLink: string;
}

/**
 * msdyn_CheckIfExecutionContextIsPassed action
 *
 * Unbound action
 */
export class msdyn_CheckIfExecutionContextIsPassedAction implements Executable<msdyn_CheckIfExecutionContextIsPassedResponse> {
  constructor(
    public readonly solutionId: string,
    public readonly excludeFormIds: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckIfExecutionContextIsPassed`;

    const body: Record<string, unknown> = {
      SolutionId: this.solutionId,
      ExcludeFormIds: this.excludeFormIds,
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

  async parseResponse(response: Response): Promise<msdyn_CheckIfExecutionContextIsPassedResponse> {
    const data = await response.json();
    return data as msdyn_CheckIfExecutionContextIsPassedResponse;
  }
}
