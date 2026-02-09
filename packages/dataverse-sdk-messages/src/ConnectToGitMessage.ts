import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * ConnectToGit request message
 *
 * Web API Action: ConnectToGit
 */
export class ConnectToGitRequest
  extends OrganizationRequest
  implements Executable<ConnectToGitResponse>
{
  constructor(
    public connectionType: number,
    public solutionUniqueName: string,
    public gitProvider: number,
    public branch: string,
    public rootFolder: string,
    public organization: string,
    public gitFolder: string,
    public project: string,
    public repository: string,
    public upstreamBranch: string
  ) {
    super("ConnectToGit");
  }

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
    return new ConnectToGitResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
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
  }
}

/**
 * ConnectToGit response message
 */
export class ConnectToGitResponse extends OrganizationResponse {
  constructor() {
    super("ConnectToGit");
  }

  static fromResponse(_data: unknown): ConnectToGitResponse {
    return new ConnectToGitResponse();
  }
}
