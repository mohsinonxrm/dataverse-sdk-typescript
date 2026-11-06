import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetAnalyticsReportDetailResponse as msdyn_GetAnalyticsReportDetailResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetAnalyticsReportDetail message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetAnalyticsReportDetailRequestParameters {
  AnalyticsRecordId: string;
  GetAnalyticsReportAction?: string;
}

/**
 * msdyn_GetAnalyticsReportDetail request message
 *
 * Web API Action: msdyn_GetAnalyticsReportDetail
 */
export class msdyn_GetAnalyticsReportDetailRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetAnalyticsReportDetailResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetAnalyticsReportDetailRequestParameters>;

  constructor(parameters: msdyn_GetAnalyticsReportDetailRequestParameters) {
    super("msdyn_GetAnalyticsReportDetail", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetAnalyticsReportDetail`;

    const body = requestBody({
      AnalyticsRecordId: this.Parameters.AnalyticsRecordId,
      GetAnalyticsReportAction: this.Parameters.GetAnalyticsReportAction,
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
    if (response.status === 204) return msdyn_GetAnalyticsReportDetailResponse.fromResponse({});
    return msdyn_GetAnalyticsReportDetailResponse.fromResponse(await response.json());
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
