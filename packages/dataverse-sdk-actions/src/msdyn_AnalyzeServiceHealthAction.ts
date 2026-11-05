import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_AnalyzeServiceHealth action
 */
export interface msdyn_AnalyzeServiceHealthResponse {
  Result: string;
}

/**
 * msdyn_AnalyzeServiceHealth action
 *
 * Unbound action
 */
export class msdyn_AnalyzeServiceHealthAction implements Executable<msdyn_AnalyzeServiceHealthResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AnalyzeServiceHealth`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_AnalyzeServiceHealthResponse> {
    const data = await response.json();
    return data as msdyn_AnalyzeServiceHealthResponse;
  }
}
