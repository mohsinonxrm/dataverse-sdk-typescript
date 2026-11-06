import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from UninstallSampleData action
 */
export interface UninstallSampleDataResponse {
  // No content returned
}

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

  async parseResponse(response: Response): Promise<UninstallSampleDataResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as UninstallSampleDataResponse;
  }
}
