import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { ExportSolutionFromGitAsyncResponse as ExportSolutionFromGitAsyncResponseData } from "./types/index.js";

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<ExportSolutionFromGitAsyncResponse> {
    const data = await response.json();
    return ExportSolutionFromGitAsyncResponse.fromResponse(data);
  }
}

/**
 * ExportSolutionFromGitAsync response message
 */
export class ExportSolutionFromGitAsyncResponse extends OrganizationResponse {
  constructor(public result: ExportSolutionFromGitAsyncResponseData) {
    super("ExportSolutionFromGitAsync");
  }

  static fromResponse(data: unknown): ExportSolutionFromGitAsyncResponse {
    return new ExportSolutionFromGitAsyncResponse(
      responseObject<ExportSolutionFromGitAsyncResponseData>(data)
    );
  }
}
