import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from UninstallSolutionAsync action
 */
export interface UninstallSolutionAsyncResponse {
  AsyncOperationId: string;
}

/**
 * UninstallSolutionAsync action
 *
 * Unbound action
 */
export class UninstallSolutionAsyncAction implements Executable<UninstallSolutionAsyncResponse> {
  constructor(public readonly solutionUniqueName: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/UninstallSolutionAsync`;

    const body: Record<string, unknown> = {
      SolutionUniqueName: this.solutionUniqueName,
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

  async parseResponse(response: Response): Promise<UninstallSolutionAsyncResponse> {
    const data = await response.json();
    return data as UninstallSolutionAsyncResponse;
  }
}
