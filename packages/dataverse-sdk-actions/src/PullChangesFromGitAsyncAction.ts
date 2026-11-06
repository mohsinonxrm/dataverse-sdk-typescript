import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import type { PullChangesFromGitParameters } from "./types/index.js";

/**
 * Response from PullChangesFromGitAsync action
 */
export interface PullChangesFromGitAsyncResponse {
  AsyncOperationId: string;
}

/**
 * Parameters of the PullChangesFromGitAsync action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface PullChangesFromGitAsyncActionParameters {
  SolutionUniqueName: string;
  AdditionalParameters?: PullChangesFromGitParameters;
}

/**
 * PullChangesFromGitAsync action
 *
 * Unbound action
 */
export class PullChangesFromGitAsyncAction implements Executable<PullChangesFromGitAsyncResponse> {
  constructor(public readonly parameters: PullChangesFromGitAsyncActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/PullChangesFromGitAsync`;

    const body = requestBody({
      SolutionUniqueName: this.parameters.SolutionUniqueName,
      AdditionalParameters: this.parameters.AdditionalParameters,
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
    if (response.status === 204) return {} as PullChangesFromGitAsyncResponse;
    return (await response.json()) as PullChangesFromGitAsyncResponse;
  }
}
