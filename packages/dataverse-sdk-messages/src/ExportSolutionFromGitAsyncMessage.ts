import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * ExportSolutionFromGitAsync request message
 *
 * Web API Action: ExportSolutionFromGitAsync
 */
export class ExportSolutionFromGitAsyncRequest
  extends OrganizationRequest
  implements Executable<ExportSolutionFromGitAsyncResponse>
{
  constructor(
    public solutionName: string,
    public managed: boolean,
    public releaseBranch: string
  ) {
    super("ExportSolutionFromGitAsync");
  }

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<ExportSolutionFromGitAsyncResponse> {
    const data = await response.json();
    return ExportSolutionFromGitAsyncResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      SolutionName: this.solutionName,
      Managed: this.managed,
      ReleaseBranch: this.releaseBranch,
    };
  }
}

/**
 * ExportSolutionFromGitAsync response message
 */
export class ExportSolutionFromGitAsyncResponse extends OrganizationResponse {
  constructor(public result: ExportSolutionFromGitAsyncResponse) {
    super("ExportSolutionFromGitAsync");
  }

  static fromResponse(data: unknown): ExportSolutionFromGitAsyncResponse {
    return new ExportSolutionFromGitAsyncResponse((data as any).value);
  }
}
