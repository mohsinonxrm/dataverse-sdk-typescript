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
    // No return value (204 No Content)
    return {};
  }
}
