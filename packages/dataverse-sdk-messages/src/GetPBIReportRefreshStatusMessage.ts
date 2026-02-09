import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<GetPBIReportRefreshStatusResponse> {
    const data = await response.json();
    return GetPBIReportRefreshStatusResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      ReportId: this.reportId,
    };
  }
}

/**
 * GetPBIReportRefreshStatus response message
 */
export class GetPBIReportRefreshStatusResponse extends OrganizationResponse {
  constructor(public result: GetPBIReportRefreshStatusResponse) {
    super("GetPBIReportRefreshStatus");
  }

  static fromResponse(data: unknown): GetPBIReportRefreshStatusResponse {
    return new GetPBIReportRefreshStatusResponse((data as any).value);
  }
}
