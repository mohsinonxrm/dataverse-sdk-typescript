import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the ConnectToGit message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ConnectToGitRequestParameters {
  ConnectionType?: number;
  SolutionUniqueName?: string;
  GitProvider?: number;
  Branch: string;
  RootFolder?: string;
  Organization?: string;
  GitFolder: string;
  Project?: string;
  Repository?: string;
  UpstreamBranch?: string;
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
      ConnectionType: this.Parameters.ConnectionType,
      SolutionUniqueName: this.Parameters.SolutionUniqueName,
      GitProvider: this.Parameters.GitProvider,
      Branch: this.Parameters.Branch,
      RootFolder: this.Parameters.RootFolder,
      Organization: this.Parameters.Organization,
      GitFolder: this.Parameters.GitFolder,
      Project: this.Parameters.Project,
      Repository: this.Parameters.Repository,
      UpstreamBranch: this.Parameters.UpstreamBranch,
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
