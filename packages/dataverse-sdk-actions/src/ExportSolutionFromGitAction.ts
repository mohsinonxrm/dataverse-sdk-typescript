import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from ExportSolutionFromGit action
 */
export interface ExportSolutionFromGitResponse {
  CommitId: string;
  SolutionZip: string;
}

/**
 * Parameters of the ExportSolutionFromGit action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ExportSolutionFromGitActionParameters {
  SolutionName: string;
  Managed: boolean;
  ReleaseBranch: string;
  IsLiteExport?: boolean;
}

/**
 * ExportSolutionFromGit action
 *
 * Unbound action
 */
export class ExportSolutionFromGitAction implements Executable<ExportSolutionFromGitResponse> {
  constructor(public readonly parameters: ExportSolutionFromGitActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ExportSolutionFromGit`;

    const body = requestBody({
      SolutionName: this.parameters.SolutionName,
      Managed: this.parameters.Managed,
      ReleaseBranch: this.parameters.ReleaseBranch,
      IsLiteExport: this.parameters.IsLiteExport,
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

  async parseResponse(response: Response): Promise<ExportSolutionFromGitResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as ExportSolutionFromGitResponse;
    return (await response.json()) as ExportSolutionFromGitResponse;
  }
}
