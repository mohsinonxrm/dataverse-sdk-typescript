import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the GetPBIReportRefreshStatus action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface GetPBIReportRefreshStatusResponse {
  "@odata.context"?: string;
  ReportRefreshStatusEndTime: string;
  ReportRefreshStatusStartTime: string;
  ReportRefreshStatusState: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as GetPBIReportRefreshStatusResponse;
  }
}
