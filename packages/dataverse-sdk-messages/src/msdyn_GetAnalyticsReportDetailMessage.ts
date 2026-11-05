import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetAnalyticsReportDetailResponse as msdyn_GetAnalyticsReportDetailResponseData } from "./types/index.js";

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetAnalyticsReportDetailResponse> {
    const data = await response.json();
    return msdyn_GetAnalyticsReportDetailResponse.fromResponse(data);
  }
}

/**
 * msdyn_GetAnalyticsReportDetail response message
 */
export class msdyn_GetAnalyticsReportDetailResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetAnalyticsReportDetailResponseData) {
    super("msdyn_GetAnalyticsReportDetail");
  }

  static fromResponse(data: unknown): msdyn_GetAnalyticsReportDetailResponse {
    return new msdyn_GetAnalyticsReportDetailResponse(
      responseObject<msdyn_GetAnalyticsReportDetailResponseData>(data)
    );
  }
}
