import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the ExportSolutionFromGit action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface ExportSolutionFromGitResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as ExportSolutionFromGitResponse;
  }
}
