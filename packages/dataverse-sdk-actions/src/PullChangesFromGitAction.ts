import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { PullChangesFromGitParameters } from "./types/index.js";

/**
 * Response from PullChangesFromGit action
 */
export interface PullChangesFromGitResponse {
  // No content returned
}

/**
 * PullChangesFromGit action
 *
 * Unbound action
 */
export class PullChangesFromGitAction implements Executable<PullChangesFromGitResponse> {
  constructor(
    public readonly solutionUniqueName: string,
    public readonly additionalParameters?: PullChangesFromGitParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/PullChangesFromGit`;

    const body: Record<string, unknown> = {
      SolutionUniqueName: this.solutionUniqueName,
      AdditionalParameters: this.additionalParameters,
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

  async parseResponse(response: Response): Promise<PullChangesFromGitResponse> {
    // No return value (204 No Content)
    return {};
  }
}
