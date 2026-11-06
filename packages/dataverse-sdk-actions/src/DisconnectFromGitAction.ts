import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the DisconnectFromGit action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface DisconnectFromGitResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as DisconnectFromGitResponse;
  }
}
