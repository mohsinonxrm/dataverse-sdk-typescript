import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the DownloadSolutionExportData message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface DownloadSolutionExportDataRequestParameters {
  ExportJobId: string;
}

/**
 * DownloadSolutionExportData request message
 *
 * Web API Action: DownloadSolutionExportData
 */
export class DownloadSolutionExportDataRequest
  extends OrganizationRequest
  implements Executable<DownloadSolutionExportDataResponse>
{
  declare readonly Parameters: Readonly<DownloadSolutionExportDataRequestParameters>;

  constructor(parameters: DownloadSolutionExportDataRequestParameters) {
    super("DownloadSolutionExportData", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/DownloadSolutionExportData`;

    const body = requestBody({
      ExportJobId: this.Parameters.ExportJobId,
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

  async parseResponse(response: Response): Promise<DownloadSolutionExportDataResponse> {
    // The body is the complex value, with its @odata.context
    return DownloadSolutionExportDataResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the DownloadSolutionExportData action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface DownloadSolutionExportDataResult {
  "@odata.context"?: string;
  ExportSolutionFile: string;
}

/**
 * DownloadSolutionExportData response message
 *
 * `result` is the value the DownloadSolutionExportData action returns (see {@link DownloadSolutionExportDataResult}).
 */
export class DownloadSolutionExportDataResponse extends OrganizationResponse {
  constructor(public result: DownloadSolutionExportDataResult) {
    super("DownloadSolutionExportData");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): DownloadSolutionExportDataResponse {
    return new DownloadSolutionExportDataResponse(data as DownloadSolutionExportDataResult);
  }
}
