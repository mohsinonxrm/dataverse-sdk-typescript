import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from RefreshChangesFromGit action
 */
export interface RefreshChangesFromGitResponse {
  // No content returned
}

/**
 * Parameters of the RefreshChangesFromGit action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RefreshChangesFromGitActionParameters {
  SolutionUniqueName: string;
}

/**
 * RefreshChangesFromGit action
 *
 * Unbound action
 */
export class RefreshChangesFromGitAction implements Executable<RefreshChangesFromGitResponse> {
  constructor(public readonly parameters: RefreshChangesFromGitActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RefreshChangesFromGit`;

    const body = requestBody({
      SolutionUniqueName: this.parameters.SolutionUniqueName,
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

  async parseResponse(response: Response): Promise<RefreshChangesFromGitResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as RefreshChangesFromGitResponse;
  }
}
