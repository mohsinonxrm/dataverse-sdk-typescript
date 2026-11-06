import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from GetPBIReportRefreshStatus action
 */
export interface GetPBIReportRefreshStatusResponse {
  ReportRefreshStatusState: string;
  ReportRefreshStatusEndTime: string;
  ReportRefreshStatusStartTime: string;
}

/**
 * Parameters of the GetPBIReportRefreshStatus action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GetPBIReportRefreshStatusActionParameters {
  ReportId: string;
}

/**
 * GetPBIReportRefreshStatus action
 *
 * Unbound action
 */
export class GetPBIReportRefreshStatusAction implements Executable<GetPBIReportRefreshStatusResponse> {
  constructor(public readonly parameters: GetPBIReportRefreshStatusActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GetPBIReportRefreshStatus`;

    const body = requestBody({
      ReportId: this.parameters.ReportId,
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as GetPBIReportRefreshStatusResponse;
    return (await response.json()) as GetPBIReportRefreshStatusResponse;
  }
}
