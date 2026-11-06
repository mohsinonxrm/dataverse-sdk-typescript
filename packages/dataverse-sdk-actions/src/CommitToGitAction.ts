import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the CommitToGit action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CommitToGitResponse {
  "@odata.context"?: string;
  CommitId: string;
  Type: number;
}

/**
 * Parameters of the CommitToGit action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CommitToGitActionParameters {
  CommitMessage: string;
  SolutionUniqueName: string;
}

/**
 * CommitToGit action
 *
 * Unbound action
 */
export class CommitToGitAction implements Executable<CommitToGitResponse> {
  constructor(public readonly parameters: CommitToGitActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CommitToGit`;

    const body = requestBody({
      CommitMessage: this.parameters.CommitMessage,
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

  async parseResponse(response: Response): Promise<CommitToGitResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as CommitToGitResponse;
  }
}
