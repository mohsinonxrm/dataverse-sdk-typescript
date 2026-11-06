import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { ExportSolutionFromGitAsyncResponse as ExportSolutionFromGitAsyncResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return ExportSolutionFromGitAsyncResponse.fromResponse({});
    return ExportSolutionFromGitAsyncResponse.fromResponse(await response.json());
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
