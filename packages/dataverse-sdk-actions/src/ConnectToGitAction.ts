import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from ConnectToGit action
 */
export interface ConnectToGitResponse {
  // No content returned
}

/**
 * Parameters of the ConnectToGit action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ConnectToGitActionParameters {
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
 * ConnectToGit action
 *
 * Unbound action
 */
export class ConnectToGitAction implements Executable<ConnectToGitResponse> {
  constructor(public readonly parameters: ConnectToGitActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ConnectToGit`;

    const body = requestBody({
      ConnectionType: this.parameters.ConnectionType,
      SolutionUniqueName: this.parameters.SolutionUniqueName,
      GitProvider: this.parameters.GitProvider,
      Branch: this.parameters.Branch,
      RootFolder: this.parameters.RootFolder,
      Organization: this.parameters.Organization,
      GitFolder: this.parameters.GitFolder,
      Project: this.parameters.Project,
      Repository: this.parameters.Repository,
      UpstreamBranch: this.parameters.UpstreamBranch,
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as ConnectToGitResponse;
    return (await response.json()) as ConnectToGitResponse;
  }
}
