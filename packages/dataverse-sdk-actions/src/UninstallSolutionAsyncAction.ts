import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from UninstallSolutionAsync action
 */
export interface UninstallSolutionAsyncResponse {
  AsyncOperationId: string;
}

/**
 * Parameters of the UninstallSolutionAsync action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface UninstallSolutionAsyncActionParameters {
  SolutionUniqueName: string;
}

/**
 * UninstallSolutionAsync action
 *
 * Unbound action
 */
export class UninstallSolutionAsyncAction implements Executable<UninstallSolutionAsyncResponse> {
  constructor(public readonly parameters: UninstallSolutionAsyncActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/UninstallSolutionAsync`;

    const body = requestBody({
      SolutionUniqueName: this.parameters.SolutionUniqueName,
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

  async parseResponse(response: Response): Promise<UninstallSolutionAsyncResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as UninstallSolutionAsyncResponse;
    return (await response.json()) as UninstallSolutionAsyncResponse;
  }
}
