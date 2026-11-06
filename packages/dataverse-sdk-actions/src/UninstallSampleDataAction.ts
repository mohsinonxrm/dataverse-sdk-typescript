import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the UninstallSampleData action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type UninstallSampleDataResponse = void;

/**
 * UninstallSampleData action
 *
 * Unbound action
 */
export class UninstallSampleDataAction implements Executable<UninstallSampleDataResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/UninstallSampleData`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  parseResponse(_response: Response): Promise<UninstallSampleDataResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
