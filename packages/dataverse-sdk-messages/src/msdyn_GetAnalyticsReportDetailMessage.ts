import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GetAnalyticsReportDetail request message
 *
 * Web API Action: msdyn_GetAnalyticsReportDetail
 */
export class msdyn_GetAnalyticsReportDetailRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetAnalyticsReportDetailResponse>
{
  constructor(
    public analyticsRecordId: string,
    public getAnalyticsReportAction: string
  ) {
    super("msdyn_GetAnalyticsReportDetail");
  }

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetAnalyticsReportDetailResponse> {
    const data = await response.json();
    return msdyn_GetAnalyticsReportDetailResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      AnalyticsRecordId: this.analyticsRecordId,
      GetAnalyticsReportAction: this.getAnalyticsReportAction,
    };
  }
}

/**
 * msdyn_GetAnalyticsReportDetail response message
 */
export class msdyn_GetAnalyticsReportDetailResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetAnalyticsReportDetailResponse) {
    super("msdyn_GetAnalyticsReportDetail");
  }

  static fromResponse(data: unknown): msdyn_GetAnalyticsReportDetailResponse {
    return new msdyn_GetAnalyticsReportDetailResponse((data as any).value);
  }
}
