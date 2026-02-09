import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from CommitToGit action
 */
export interface CommitToGitResponse {
  Type: number;
  CommitId: string;
}

/**
 * CommitToGit action
 *
 * Unbound action
 */
export class CommitToGitAction implements Executable<CommitToGitResponse> {
  constructor(
    public readonly commitMessage: string,
    public readonly solutionUniqueName: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CommitToGit`;

    const body: Record<string, unknown> = {
      CommitMessage: this.commitMessage,
      SolutionUniqueName: this.solutionUniqueName,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<CommitToGitResponse> {
    const data = await response.json();
    return data as CommitToGitResponse;
  }
}
