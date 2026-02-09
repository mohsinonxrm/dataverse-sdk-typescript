import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_ExportAnalyticsReport action
 */
export interface msdyn_ExportAnalyticsReportResponse {
  msdyn_AnalyticsReportContent: string;
}

/**
 * msdyn_ExportAnalyticsReport action
 *
 * Unbound action
 */
export class msdyn_ExportAnalyticsReportAction implements Executable<msdyn_ExportAnalyticsReportResponse> {
  constructor(public readonly msdyn_AnalyticsFeatureId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ExportAnalyticsReport`;

    const body: Record<string, unknown> = {
      msdyn_AnalyticsFeatureId: this.msdyn_AnalyticsFeatureId,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_ExportAnalyticsReportResponse> {
    const data = await response.json();
    return data as msdyn_ExportAnalyticsReportResponse;
  }
}
