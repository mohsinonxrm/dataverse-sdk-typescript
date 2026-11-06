import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_ImportAnalyticsReport action
 */
export interface msdyn_ImportAnalyticsReportResponse {
  // No content returned
}

/**
 * msdyn_ImportAnalyticsReport action
 *
 * Unbound action
 */
export class msdyn_ImportAnalyticsReportAction implements Executable<msdyn_ImportAnalyticsReportResponse> {
  constructor(
    public readonly msdyn_OverwriteDraft: boolean | undefined,
    public readonly msdyn_AnalyticsReportContent: string,
    public readonly msdyn_AnalyticsFeatureId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ImportAnalyticsReport`;

    const body: Record<string, unknown> = {
      msdyn_OverwriteDraft: this.msdyn_OverwriteDraft,
      msdyn_AnalyticsReportContent: this.msdyn_AnalyticsReportContent,
      msdyn_AnalyticsFeatureId: this.msdyn_AnalyticsFeatureId,
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

  async parseResponse(response: Response): Promise<msdyn_ImportAnalyticsReportResponse> {
    // No return value (204 No Content)
    return {};
  }
}
