import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from ConnectToGit action
 */
export interface ConnectToGitResponse {
  // No content returned
}

/**
 * ConnectToGit action
 *
 * Unbound action
 */
export class ConnectToGitAction implements Executable<ConnectToGitResponse> {
  constructor(
    public readonly connectionType: number,
    public readonly solutionUniqueName: string,
    public readonly gitProvider: number,
    public readonly branch: string,
    public readonly rootFolder: string,
    public readonly organization: string,
    public readonly gitFolder: string,
    public readonly project: string,
    public readonly repository: string,
    public readonly upstreamBranch: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ConnectToGit`;

    const body: Record<string, unknown> = {
      ConnectionType: this.connectionType,
      SolutionUniqueName: this.solutionUniqueName,
      GitProvider: this.gitProvider,
      Branch: this.branch,
      RootFolder: this.rootFolder,
      Organization: this.organization,
      GitFolder: this.gitFolder,
      Project: this.project,
      Repository: this.repository,
      UpstreamBranch: this.upstreamBranch,
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

  async parseResponse(response: Response): Promise<ConnectToGitResponse> {
    // No return value (204 No Content)
    return {};
  }
}
