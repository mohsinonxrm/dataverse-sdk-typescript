import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from DisconnectFromGit action
 */
export interface DisconnectFromGitResponse {
  // No content returned
}

/**
 * DisconnectFromGit action
 *
 * Unbound action
 */
export class DisconnectFromGitAction implements Executable<DisconnectFromGitResponse> {
  constructor(public readonly solutionUniqueName: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/DisconnectFromGit`;

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

  async parseResponse(response: Response): Promise<DisconnectFromGitResponse> {
    // No return value (204 No Content)
    return {};
  }
}
