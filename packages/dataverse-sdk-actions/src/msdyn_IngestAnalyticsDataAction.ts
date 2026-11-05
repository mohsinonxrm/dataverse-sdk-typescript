import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_IngestAnalyticsData action
 */
export interface msdyn_IngestAnalyticsDataResponse {
  // No content returned
}

/**
 * msdyn_IngestAnalyticsData action
 *
 * Unbound action
 */
export class msdyn_IngestAnalyticsDataAction implements Executable<msdyn_IngestAnalyticsDataResponse> {
  constructor(public readonly ingestionRequest: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IngestAnalyticsData`;

    const body: Record<string, unknown> = {
      IngestionRequest: this.ingestionRequest,
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

  async parseResponse(response: Response): Promise<msdyn_IngestAnalyticsDataResponse> {
    // No return value (204 No Content)
    return {};
  }
}
