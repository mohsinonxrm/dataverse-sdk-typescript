import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from RefreshChangesFromGit action
 */
export interface RefreshChangesFromGitResponse {
  // No content returned
}

/**
 * RefreshChangesFromGit action
 *
 * Unbound action
 */
export class RefreshChangesFromGitAction implements Executable<RefreshChangesFromGitResponse> {
  constructor(public readonly solutionUniqueName: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RefreshChangesFromGit`;

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

  async parseResponse(response: Response): Promise<RefreshChangesFromGitResponse> {
    // No return value (204 No Content)
    return {};
  }
}
