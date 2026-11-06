import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from DisconnectFromGit action
 */
export interface DisconnectFromGitResponse {
  Response: string;
}

/**
 * Parameters of the DisconnectFromGit action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface DisconnectFromGitActionParameters {
  SolutionUniqueName?: string;
}

/**
 * DisconnectFromGit action
 *
 * Unbound action
 */
export class DisconnectFromGitAction implements Executable<DisconnectFromGitResponse> {
  constructor(public readonly parameters: DisconnectFromGitActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/DisconnectFromGit`;

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

  async parseResponse(response: Response): Promise<DisconnectFromGitResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as DisconnectFromGitResponse;
    return (await response.json()) as DisconnectFromGitResponse;
  }
}
