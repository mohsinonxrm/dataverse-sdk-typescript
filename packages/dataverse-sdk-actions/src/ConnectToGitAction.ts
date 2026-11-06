import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { githubappconfig } from "./types/index.js";

/**
 * Response from the ConnectToGit action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type ConnectToGitResponse = void;

/**
 * Parameters of the ConnectToGit action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ConnectToGitActionParameters {
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
 * ConnectToGit action
 *
 * Unbound action
 */
export class ConnectToGitAction implements Executable<ConnectToGitResponse> {
  constructor(public readonly parameters: ConnectToGitActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ConnectToGit`;

    const body = requestBody({
      UpstreamBranch: this.parameters.UpstreamBranch,
      GitHubConnectionId: this.parameters.GitHubConnectionId,
      GitHubPAT: this.parameters.GitHubPAT,
      EnterpriseSubdomain: this.parameters.EnterpriseSubdomain,
      SolutionUniqueName: this.parameters.SolutionUniqueName,
      GitProvider: this.parameters.GitProvider,
      GitFolder: this.parameters.GitFolder,
      GitHubAppConfigId: this.parameters.GitHubAppConfigId,
      RootFolder: this.parameters.RootFolder,
      Repository: this.parameters.Repository,
      Branch: this.parameters.Branch,
      Organization: this.parameters.Organization,
      Project: this.parameters.Project,
      ConnectionType: this.parameters.ConnectionType,
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

  parseResponse(_response: Response): Promise<ConnectToGitResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
