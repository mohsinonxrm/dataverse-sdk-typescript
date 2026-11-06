import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_GetAnalyticsReportDetailResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetAnalyticsReportDetail action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetAnalyticsReportDetailResult {
  "@odata.context"?: string;
  ReportInfo: string;
}

/**
 * msdyn_GetAnalyticsReportDetail response message
 *
 * `result` is the value the msdyn_GetAnalyticsReportDetail action returns (see {@link msdyn_GetAnalyticsReportDetailResult}).
 */
export class msdyn_GetAnalyticsReportDetailResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetAnalyticsReportDetailResult) {
    super("msdyn_GetAnalyticsReportDetail");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetAnalyticsReportDetailResponse {
    return new msdyn_GetAnalyticsReportDetailResponse(data as msdyn_GetAnalyticsReportDetailResult);
  }
}
