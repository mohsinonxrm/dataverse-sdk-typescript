import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { GetPBIReportRefreshStatusResponse as GetPBIReportRefreshStatusResponseData } from "./types/index.js";

/**
 * Parameters of the GetPBIReportRefreshStatus message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GetPBIReportRefreshStatusRequestParameters {
  ReportId: string;
}

/**
 * GetPBIReportRefreshStatus request message
 *
 * Web API Action: GetPBIReportRefreshStatus
 */
export class GetPBIReportRefreshStatusRequest
  extends OrganizationRequest
  implements Executable<GetPBIReportRefreshStatusResponse>
{
  declare readonly Parameters: Readonly<GetPBIReportRefreshStatusRequestParameters>;

  constructor(parameters: GetPBIReportRefreshStatusRequestParameters) {
    super("GetPBIReportRefreshStatus", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GetPBIReportRefreshStatus`;

    const body = requestBody({
      ReportId: this.Parameters.ReportId,
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

  async parseResponse(response: Response): Promise<GetPBIReportRefreshStatusResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return GetPBIReportRefreshStatusResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * GetPBIReportRefreshStatus response message
 */
export class GetPBIReportRefreshStatusResponse extends OrganizationResponse {
  constructor(public result: GetPBIReportRefreshStatusResponseData) {
    super("GetPBIReportRefreshStatus");
  }

  static fromResponse(data: unknown): GetPBIReportRefreshStatusResponse {
    return new GetPBIReportRefreshStatusResponse(
      responseObject<GetPBIReportRefreshStatusResponseData>(data)
    );
  }
}
