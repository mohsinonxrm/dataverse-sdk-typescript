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
    public connectionType: number | undefined,
    public solutionUniqueName: string | undefined,
    public gitProvider: number | undefined,
    public branch: string,
    public rootFolder: string | undefined,
    public organization: string | undefined,
    public gitFolder: string,
    public project?: string,
    public repository?: string,
    public upstreamBranch?: string
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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<ConnectToGitResponse> {
    // No return value (204 No Content)
    return new ConnectToGitResponse();
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
