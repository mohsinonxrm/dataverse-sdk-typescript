import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";

/**
 * GetReportHistoryLimit request message
 *
 * Web API Function: GetReportHistoryLimit
 *
 * The first argument is the id of the report record to call it on.
 */
export class GetReportHistoryLimitRequest
  extends OrganizationRequest
  implements Executable<GetReportHistoryLimitResponse>
{
  constructor(public reportId: string) {
    super("GetReportHistoryLimit");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/reports(${odataLiteral.guid(this.reportId)})/Microsoft.Dynamics.CRM.GetReportHistoryLimit`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<GetReportHistoryLimitResponse> {
    // The body is the complex value, with its @odata.context
    return GetReportHistoryLimitResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the GetReportHistoryLimit function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface GetReportHistoryLimitResult {
  "@odata.context"?: string;
  HistoryLimit: number;
}

/**
 * GetReportHistoryLimit response message
 *
 * `result` is the value the GetReportHistoryLimit function returns (see {@link GetReportHistoryLimitResult}).
 */
export class GetReportHistoryLimitResponse extends OrganizationResponse {
  constructor(public result: GetReportHistoryLimitResult) {
    super("GetReportHistoryLimit");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): GetReportHistoryLimitResponse {
    return new GetReportHistoryLimitResponse(data as GetReportHistoryLimitResult);
  }
}
