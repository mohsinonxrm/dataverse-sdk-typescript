import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from InstallSampleData action
 */
export interface InstallSampleDataResponse {
  // No content returned
}

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

  async parseResponse(response: Response): Promise<InstallSampleDataResponse> {
    // No return value (204 No Content)
    return {};
  }
}
