import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from UninstallSolution action
 */
export interface UninstallSolutionResponse {
  // No content returned
}

/**
 * UninstallSolution action
 *
 * Unbound action
 */
export class UninstallSolutionAction implements Executable<UninstallSolutionResponse> {
  constructor(public readonly solutionUniqueName: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/UninstallSolution`;

    const body: Record<string, unknown> = {
      SolutionUniqueName: this.solutionUniqueName,
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

  async parseResponse(response: Response): Promise<UninstallSolutionResponse> {
    // No return value (204 No Content)
    return {};
  }
}
