import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from ExportSolutionFromGitAsync action
 */
export interface ExportSolutionFromGitAsyncResponse {
  AsyncOperationId: string;
  ExportJobId: string;
}

/**
 * Parameters of the ExportSolutionFromGitAsync action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ExportSolutionFromGitAsyncActionParameters {
  SolutionName: string;
  Managed: boolean;
  ReleaseBranch: string;
}

/**
 * ExportSolutionFromGitAsync action
 *
 * Unbound action
 */
export class ExportSolutionFromGitAsyncAction implements Executable<ExportSolutionFromGitAsyncResponse> {
  constructor(public readonly parameters: ExportSolutionFromGitAsyncActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ExportSolutionFromGitAsync`;

    const body = requestBody({
      SolutionName: this.parameters.SolutionName,
      Managed: this.parameters.Managed,
      ReleaseBranch: this.parameters.ReleaseBranch,
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

  async parseResponse(response: Response): Promise<ExportSolutionFromGitAsyncResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as ExportSolutionFromGitAsyncResponse;
    return (await response.json()) as ExportSolutionFromGitAsyncResponse;
  }
}
