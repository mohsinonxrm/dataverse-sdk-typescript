import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type {
  PullChangesFromGitAsyncResponse as PullChangesFromGitAsyncResponseData,
  PullChangesFromGitParameters,
} from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return PullChangesFromGitAsyncResponse.fromResponse({});
    return PullChangesFromGitAsyncResponse.fromResponse(await response.json());
  }
}

/**
 * PullChangesFromGitAsync response message
 */
export class PullChangesFromGitAsyncResponse extends OrganizationResponse {
  constructor(public result: PullChangesFromGitAsyncResponseData) {
    super("PullChangesFromGitAsync");
  }

  static fromResponse(data: unknown): PullChangesFromGitAsyncResponse {
    return new PullChangesFromGitAsyncResponse(
      responseObject<PullChangesFromGitAsyncResponseData>(data)
    );
  }
}
