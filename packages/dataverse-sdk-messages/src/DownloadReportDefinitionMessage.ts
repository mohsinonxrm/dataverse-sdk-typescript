import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";

/**
 * DownloadReportDefinition request message
 *
 * Web API Function: DownloadReportDefinition
 *
 * The first argument is the id of the report record to call it on.
 */
export class DownloadReportDefinitionRequest
  extends OrganizationRequest
  implements Executable<DownloadReportDefinitionResponse>
{
  constructor(public reportId: string) {
    super("DownloadReportDefinition");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/reports(${odataLiteral.guid(this.reportId)})/Microsoft.Dynamics.CRM.DownloadReportDefinition`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<DownloadReportDefinitionResponse> {
    // The body is the complex value, with its @odata.context
    return DownloadReportDefinitionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the DownloadReportDefinition function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface DownloadReportDefinitionResult {
  "@odata.context"?: string;
  BodyText: string;
}

/**
 * DownloadReportDefinition response message
 *
 * `result` is the value the DownloadReportDefinition function returns (see {@link DownloadReportDefinitionResult}).
 */
export class DownloadReportDefinitionResponse extends OrganizationResponse {
  constructor(public result: DownloadReportDefinitionResult) {
    super("DownloadReportDefinition");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): DownloadReportDefinitionResponse {
    return new DownloadReportDefinitionResponse(data as DownloadReportDefinitionResult);
  }
}
