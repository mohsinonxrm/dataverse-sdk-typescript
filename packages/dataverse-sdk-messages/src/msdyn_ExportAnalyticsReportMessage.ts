import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_ExportAnalyticsReport message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ExportAnalyticsReportRequestParameters {
  msdyn_AnalyticsFeatureId: string;
}

/**
 * msdyn_ExportAnalyticsReport request message
 *
 * Web API Action: msdyn_ExportAnalyticsReport
 */
export class msdyn_ExportAnalyticsReportRequest
  extends OrganizationRequest
  implements Executable<msdyn_ExportAnalyticsReportResponse>
{
  declare readonly Parameters: Readonly<msdyn_ExportAnalyticsReportRequestParameters>;

  constructor(parameters: msdyn_ExportAnalyticsReportRequestParameters) {
    super("msdyn_ExportAnalyticsReport", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ExportAnalyticsReport`;

    const body = requestBody({
      msdyn_AnalyticsFeatureId: this.Parameters.msdyn_AnalyticsFeatureId,
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

  async parseResponse(response: Response): Promise<msdyn_ExportAnalyticsReportResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_ExportAnalyticsReportResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_ExportAnalyticsReport action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ExportAnalyticsReportResult {
  "@odata.context"?: string;
  msdyn_AnalyticsReportContent: string;
}

/**
 * msdyn_ExportAnalyticsReport response message
 *
 * `result` is the value the msdyn_ExportAnalyticsReport action returns (see {@link msdyn_ExportAnalyticsReportResult}).
 */
export class msdyn_ExportAnalyticsReportResponse extends OrganizationResponse {
  constructor(public result: msdyn_ExportAnalyticsReportResult) {
    super("msdyn_ExportAnalyticsReport");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_ExportAnalyticsReportResponse {
    return new msdyn_ExportAnalyticsReportResponse(data as msdyn_ExportAnalyticsReportResult);
  }
}
