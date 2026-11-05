import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_AnalyzeServiceHealthAsync action
 */
export interface msdyn_AnalyzeServiceHealthAsyncResponse {
  // No content returned
}

/**
 * msdyn_AnalyzeServiceHealthAsync action
 *
 * Unbound action
 */
export class msdyn_AnalyzeServiceHealthAsyncAction implements Executable<msdyn_AnalyzeServiceHealthAsyncResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AnalyzeServiceHealthAsync`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_AnalyzeServiceHealthAsyncResponse> {
    // No return value (204 No Content)
    return {};
  }
}
