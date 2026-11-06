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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as InstallSampleDataResponse;
    return (await response.json()) as InstallSampleDataResponse;
  }
}
