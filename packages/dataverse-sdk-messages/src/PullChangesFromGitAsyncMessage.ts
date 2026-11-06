import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import type { PullChangesFromGitParameters } from "./types/index.js";

/**
 * Parameters of the PullChangesFromGitAsync message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface PullChangesFromGitAsyncRequestParameters {
  SolutionUniqueName: string;
  AdditionalParameters?: PullChangesFromGitParameters;
}

/**
 * PullChangesFromGitAsync request message
 *
 * Web API Action: PullChangesFromGitAsync
 */
export class PullChangesFromGitAsyncRequest
  extends OrganizationRequest
  implements Executable<PullChangesFromGitAsyncResponse>
{
  declare readonly Parameters: Readonly<PullChangesFromGitAsyncRequestParameters>;

  constructor(parameters: PullChangesFromGitAsyncRequestParameters) {
    super("PullChangesFromGitAsync", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/PullChangesFromGitAsync`;

    const body = requestBody({
      SolutionUniqueName: this.Parameters.SolutionUniqueName,
      AdditionalParameters: this.Parameters.AdditionalParameters,
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

  async parseResponse(response: Response): Promise<PullChangesFromGitAsyncResponse> {
    // The body is the complex value, with its @odata.context
    return PullChangesFromGitAsyncResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the PullChangesFromGitAsync action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface PullChangesFromGitAsyncResult {
  "@odata.context"?: string;
  AsyncOperationId: string;
}

/**
 * PullChangesFromGitAsync response message
 *
 * `result` is the value the PullChangesFromGitAsync action returns (see {@link PullChangesFromGitAsyncResult}).
 */
export class PullChangesFromGitAsyncResponse extends OrganizationResponse {
  constructor(public result: PullChangesFromGitAsyncResult) {
    super("PullChangesFromGitAsync");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): PullChangesFromGitAsyncResponse {
    return new PullChangesFromGitAsyncResponse(data as PullChangesFromGitAsyncResult);
  }
}
