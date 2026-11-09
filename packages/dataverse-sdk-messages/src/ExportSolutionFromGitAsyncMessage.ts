import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the ExportSolutionFromGitAsync message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ExportSolutionFromGitAsyncRequestParameters {
  SolutionName: string;
  Managed: boolean;
  ReleaseBranch: string;
}

/**
 * ExportSolutionFromGitAsync request message
 *
 * Web API Action: ExportSolutionFromGitAsync
 */
export class ExportSolutionFromGitAsyncRequest
  extends OrganizationRequest
  implements Executable<ExportSolutionFromGitAsyncResponse>
{
  declare readonly Parameters: Readonly<ExportSolutionFromGitAsyncRequestParameters>;

  constructor(parameters: ExportSolutionFromGitAsyncRequestParameters) {
    super("ExportSolutionFromGitAsync", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ExportSolutionFromGitAsync`;

    const body = requestBody({
      SolutionName: this.Parameters.SolutionName,
      Managed: this.Parameters.Managed,
      ReleaseBranch: this.Parameters.ReleaseBranch,
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
    // The body is the complex value, with its @odata.context
    return ExportSolutionFromGitAsyncResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the ExportSolutionFromGitAsync action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface ExportSolutionFromGitAsyncResult {
  "@odata.context"?: string;
  AsyncOperationId: string;
  ExportJobId: string;
}

/**
 * ExportSolutionFromGitAsync response message
 *
 * `result` is the value the ExportSolutionFromGitAsync action returns (see {@link ExportSolutionFromGitAsyncResult}).
 */
export class ExportSolutionFromGitAsyncResponse extends OrganizationResponse {
  constructor(public result: ExportSolutionFromGitAsyncResult) {
    super("ExportSolutionFromGitAsync");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): ExportSolutionFromGitAsyncResponse {
    return new ExportSolutionFromGitAsyncResponse(data as ExportSolutionFromGitAsyncResult);
  }
}
