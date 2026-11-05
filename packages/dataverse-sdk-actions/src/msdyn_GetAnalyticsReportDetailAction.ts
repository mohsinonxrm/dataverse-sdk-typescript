import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetAnalyticsReportDetail action
 */
export interface msdyn_GetAnalyticsReportDetailResponse {
  ReportInfo: string;
}

/**
 * msdyn_GetAnalyticsReportDetail action
 *
 * Unbound action
 */
export class msdyn_GetAnalyticsReportDetailAction implements Executable<msdyn_GetAnalyticsReportDetailResponse> {
  constructor(
    public readonly analyticsRecordId: string,
    public readonly getAnalyticsReportAction: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetAnalyticsReportDetail`;

    const body: Record<string, unknown> = {
      AnalyticsRecordId: this.analyticsRecordId,
      GetAnalyticsReportAction: this.getAnalyticsReportAction,
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

  async parseResponse(response: Response): Promise<msdyn_GetAnalyticsReportDetailResponse> {
    const data = await response.json();
    return data as msdyn_GetAnalyticsReportDetailResponse;
  }
}
