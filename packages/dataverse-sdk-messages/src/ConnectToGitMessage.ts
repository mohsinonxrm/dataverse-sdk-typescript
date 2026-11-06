import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { githubappconfig } from "./types/index.js";

/**
 * Parameters of the ConnectToGit message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ConnectToGitRequestParameters {
  UpstreamBranch?: string;
  GitHubConnectionId?: string;
  GitHubPAT?: string;
  EnterpriseSubdomain?: string;
  SolutionUniqueName?: string;
  GitProvider?: number;
  GitFolder: string;
  GitHubAppConfigId?: EntityReference | EntityPayload<githubappconfig>;
  RootFolder?: string;
  Repository?: string;
  Branch: string;
  Organization?: string;
  Project?: string;
  ConnectionType?: number;
}

/**
 * ConnectToGit request message
 *
 * Web API Action: ConnectToGit
 */
export class ConnectToGitRequest
  extends OrganizationRequest
  implements Executable<ConnectToGitResponse>
{
  declare readonly Parameters: Readonly<ConnectToGitRequestParameters>;

  constructor(parameters: ConnectToGitRequestParameters) {
    super("ConnectToGit", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ConnectToGit`;

    const body = requestBody({
      UpstreamBranch: this.Parameters.UpstreamBranch,
      GitHubConnectionId: this.Parameters.GitHubConnectionId,
      GitHubPAT: this.Parameters.GitHubPAT,
      EnterpriseSubdomain: this.Parameters.EnterpriseSubdomain,
      SolutionUniqueName: this.Parameters.SolutionUniqueName,
      GitProvider: this.Parameters.GitProvider,
      GitFolder: this.Parameters.GitFolder,
      GitHubAppConfigId: this.Parameters.GitHubAppConfigId,
      RootFolder: this.Parameters.RootFolder,
      Repository: this.Parameters.Repository,
      Branch: this.Parameters.Branch,
      Organization: this.Parameters.Organization,
      Project: this.Parameters.Project,
      ConnectionType: this.Parameters.ConnectionType,
    });

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
