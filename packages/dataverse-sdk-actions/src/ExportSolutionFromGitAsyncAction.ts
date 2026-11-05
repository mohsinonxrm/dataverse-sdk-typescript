import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from ExportSolutionFromGitAsync action
 */
export interface ExportSolutionFromGitAsyncResponse {
  AsyncOperationId: string;
  ExportJobId: string;
}

/**
 * ExportSolutionFromGitAsync action
 *
 * Unbound action
 */
export class ExportSolutionFromGitAsyncAction implements Executable<ExportSolutionFromGitAsyncResponse> {
  constructor(
    public readonly solutionName: string,
    public readonly managed: boolean,
    public readonly releaseBranch: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ExportSolutionFromGitAsync`;

    const body: Record<string, unknown> = {
      SolutionName: this.solutionName,
      Managed: this.managed,
      ReleaseBranch: this.releaseBranch,
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

  async parseResponse(response: Response): Promise<ExportSolutionFromGitAsyncResponse> {
    const data = await response.json();
    return data as ExportSolutionFromGitAsyncResponse;
  }
}
