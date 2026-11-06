import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from ExportSolutionFromGit action
 */
export interface ExportSolutionFromGitResponse {
  SolutionZip: string;
  CommitId: string;
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as ExportSolutionFromGitResponse;
  }
}
