import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return ExportSolutionFromGitResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the ExportSolutionFromGit action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface ExportSolutionFromGitResult {
  "@odata.context"?: string;
  CommitId: string;
  SolutionZip: string;
}

/**
 * ExportSolutionFromGit response message
 *
 * `result` is the value the ExportSolutionFromGit action returns (see {@link ExportSolutionFromGitResult}).
 */
export class ExportSolutionFromGitResponse extends OrganizationResponse {
  constructor(public result: ExportSolutionFromGitResult) {
    super("ExportSolutionFromGit");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): ExportSolutionFromGitResponse {
    return new ExportSolutionFromGitResponse(data as ExportSolutionFromGitResult);
  }
}
