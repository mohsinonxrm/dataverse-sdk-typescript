import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_AnalyzeServiceHealth action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_AnalyzeServiceHealthResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_AnalyzeServiceHealthResponse;
  }
}
