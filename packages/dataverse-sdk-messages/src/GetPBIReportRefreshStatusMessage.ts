import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return GetPBIReportRefreshStatusResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the GetPBIReportRefreshStatus action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface GetPBIReportRefreshStatusResult {
  "@odata.context"?: string;
  ReportRefreshStatusEndTime: string;
  ReportRefreshStatusStartTime: string;
  ReportRefreshStatusState: string;
}

/**
 * GetPBIReportRefreshStatus response message
 *
 * `result` is the value the GetPBIReportRefreshStatus action returns (see {@link GetPBIReportRefreshStatusResult}).
 */
export class GetPBIReportRefreshStatusResponse extends OrganizationResponse {
  constructor(public result: GetPBIReportRefreshStatusResult) {
    super("GetPBIReportRefreshStatus");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): GetPBIReportRefreshStatusResponse {
    return new GetPBIReportRefreshStatusResponse(data as GetPBIReportRefreshStatusResult);
  }
}
