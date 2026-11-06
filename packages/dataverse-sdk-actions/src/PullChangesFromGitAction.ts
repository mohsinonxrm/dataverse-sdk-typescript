import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import type { PullChangesFromGitParameters } from "./types/index.js";

/**
 * Response from PullChangesFromGit action
 */
export interface PullChangesFromGitResponse {
  // No content returned
}

/**
 * Parameters of the PullChangesFromGit action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface PullChangesFromGitActionParameters {
  SolutionUniqueName: string;
  AdditionalParameters?: PullChangesFromGitParameters;
}

/**
 * PullChangesFromGit action
 *
 * Unbound action
 */
export class PullChangesFromGitAction implements Executable<PullChangesFromGitResponse> {
  constructor(public readonly parameters: PullChangesFromGitActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/PullChangesFromGit`;

    const body = requestBody({
      SolutionUniqueName: this.parameters.SolutionUniqueName,
      AdditionalParameters: this.parameters.AdditionalParameters,
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

  async parseResponse(response: Response): Promise<PullChangesFromGitResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as PullChangesFromGitResponse;
    return (await response.json()) as PullChangesFromGitResponse;
  }
}
