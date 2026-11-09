import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_GetAnalyticsReportDetail action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetAnalyticsReportDetailResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetAnalyticsReportDetailResponse;
  }
}
