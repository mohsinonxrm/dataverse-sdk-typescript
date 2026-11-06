import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { GetPBIReportRefreshStatusResponse as GetPBIReportRefreshStatusResponseData } from "./types/index.js";

/**
 * GetPBIReportRefreshStatus request message
 *
 * Web API Action: GetPBIReportRefreshStatus
 */
export class GetPBIReportRefreshStatusRequest
  extends OrganizationRequest
  implements Executable<GetPBIReportRefreshStatusResponse>
{
  constructor(public reportId: string) {
    super("GetPBIReportRefreshStatus");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GetPBIReportRefreshStatus`;

    const body: Record<string, unknown> = {
      ReportId: this.reportId,
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

  async parseResponse(response: Response): Promise<GetPBIReportRefreshStatusResponse> {
    const data = await response.json();
    return GetPBIReportRefreshStatusResponse.fromResponse(data);
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
