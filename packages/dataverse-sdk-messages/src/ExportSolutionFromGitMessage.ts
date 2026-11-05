import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { ExportSolutionFromGitResponse as ExportSolutionFromGitResponseData } from "./types/index.js";

/**
 * ExportSolutionFromGit request message
 *
 * Web API Action: ExportSolutionFromGit
 */
export class ExportSolutionFromGitRequest
  extends OrganizationRequest
  implements Executable<ExportSolutionFromGitResponse>
{
  constructor(
    public solutionName: string,
    public managed: boolean,
    public releaseBranch: string,
    public isLiteExport: boolean
  ) {
    super("ExportSolutionFromGit");
  }

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
    return ExportSolutionFromGitResponse.fromResponse(data);
  }
}

/**
 * ExportSolutionFromGit response message
 */
export class ExportSolutionFromGitResponse extends OrganizationResponse {
  constructor(public result: ExportSolutionFromGitResponseData) {
    super("ExportSolutionFromGit");
  }

  static fromResponse(data: unknown): ExportSolutionFromGitResponse {
    return new ExportSolutionFromGitResponse(
      responseObject<ExportSolutionFromGitResponseData>(data)
    );
  }
}
