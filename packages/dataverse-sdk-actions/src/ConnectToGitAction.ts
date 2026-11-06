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
    public readonly connectionType: number | undefined,
    public readonly solutionUniqueName: string | undefined,
    public readonly gitProvider: number | undefined,
    public readonly branch: string,
    public readonly rootFolder: string | undefined,
    public readonly organization: string | undefined,
    public readonly gitFolder: string,
    public readonly project?: string,
    public readonly repository?: string,
    public readonly upstreamBranch?: string
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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<ConnectToGitResponse> {
    // No return value (204 No Content)
    return {};
  }
}
