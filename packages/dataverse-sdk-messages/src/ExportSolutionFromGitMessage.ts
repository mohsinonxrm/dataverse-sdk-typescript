import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { ExportSolutionFromGitResponse as ExportSolutionFromGitResponseData } from "./types/index.js";

/**
 * Parameters of the ExportSolutionFromGit message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ExportSolutionFromGitRequestParameters {
  SolutionName: string;
  Managed: boolean;
  ReleaseBranch: string;
  IsLiteExport?: boolean;
}

/**
 * ExportSolutionFromGit request message
 *
 * Web API Action: ExportSolutionFromGit
 */
export class ExportSolutionFromGitRequest
  extends OrganizationRequest
  implements Executable<ExportSolutionFromGitResponse>
{
  declare readonly Parameters: Readonly<ExportSolutionFromGitRequestParameters>;

  constructor(parameters: ExportSolutionFromGitRequestParameters) {
    super("ExportSolutionFromGit", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ExportSolutionFromGit`;

    const body = requestBody({
      SolutionName: this.Parameters.SolutionName,
      Managed: this.Parameters.Managed,
      ReleaseBranch: this.Parameters.ReleaseBranch,
      IsLiteExport: this.Parameters.IsLiteExport,
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
    if (response.status === 204) return ExportSolutionFromGitResponse.fromResponse({});
    return ExportSolutionFromGitResponse.fromResponse(await response.json());
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
