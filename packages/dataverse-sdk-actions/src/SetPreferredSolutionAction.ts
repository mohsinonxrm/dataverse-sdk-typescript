import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from SetPreferredSolution action
 */
export interface SetPreferredSolutionResponse {
  // No content returned
}

/**
 * SetPreferredSolution action
 *
 * Unbound action
 */
export class SetPreferredSolutionAction implements Executable<SetPreferredSolutionResponse> {
  constructor(public readonly solutionId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SetPreferredSolution`;

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

  async parseResponse(response: Response): Promise<SetPreferredSolutionResponse> {
    // No return value (204 No Content)
    return {};
  }
}
