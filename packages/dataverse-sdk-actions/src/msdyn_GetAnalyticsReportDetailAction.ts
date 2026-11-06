import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetAnalyticsReportDetail action
 */
export interface msdyn_GetAnalyticsReportDetailResponse {
  ReportInfo: string;
}

/**
 * Parameters of the msdyn_GetAnalyticsReportDetail action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetAnalyticsReportDetailActionParameters {
  AnalyticsRecordId: string;
  GetAnalyticsReportAction?: string;
}

/**
 * msdyn_GetAnalyticsReportDetail action
 *
 * Unbound action
 */
export class msdyn_GetAnalyticsReportDetailAction implements Executable<msdyn_GetAnalyticsReportDetailResponse> {
  constructor(public readonly parameters: msdyn_GetAnalyticsReportDetailActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetAnalyticsReportDetail`;

    const body = requestBody({
      AnalyticsRecordId: this.parameters.AnalyticsRecordId,
      GetAnalyticsReportAction: this.parameters.GetAnalyticsReportAction,
    });

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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GetAnalyticsReportDetailResponse;
    return (await response.json()) as msdyn_GetAnalyticsReportDetailResponse;
  }
}
