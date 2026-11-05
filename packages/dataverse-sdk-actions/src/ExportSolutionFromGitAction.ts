import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from ExportSolutionFromGit action
 */
export interface ExportSolutionFromGitResponse {
  SolutionZip: string;
  CommitId: string;
}

/**
 * ExportSolutionFromGit action
 *
 * Unbound action
 */
export class ExportSolutionFromGitAction implements Executable<ExportSolutionFromGitResponse> {
  constructor(
    public readonly solutionName: string,
    public readonly managed: boolean,
    public readonly releaseBranch: string,
    public readonly isLiteExport: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ExportSolutionFromGit`;

    const body: Record<string, unknown> = {
      SolutionName: this.solutionName,
      Managed: this.managed,
      ReleaseBranch: this.releaseBranch,
      IsLiteExport: this.isLiteExport,
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

  async parseResponse(response: Response): Promise<ExportSolutionFromGitResponse> {
    const data = await response.json();
    return data as ExportSolutionFromGitResponse;
  }
}
