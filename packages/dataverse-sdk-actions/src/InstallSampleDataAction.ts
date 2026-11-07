import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the InstallSampleData action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type InstallSampleDataResponse = void;

/**
 * InstallSampleData action
 *
 * Unbound action
 */
export class InstallSampleDataAction implements Executable<InstallSampleDataResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/InstallSampleData`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  parseResponse(_response: Response): Promise<InstallSampleDataResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
