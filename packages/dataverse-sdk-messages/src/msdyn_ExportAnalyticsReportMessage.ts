import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_ExportAnalyticsReport request message
 *
 * Web API Action: msdyn_ExportAnalyticsReport
 */
export class msdyn_ExportAnalyticsReportRequest
  extends OrganizationRequest
  implements Executable<msdyn_ExportAnalyticsReportResponse>
{
  constructor(public msdyn_AnalyticsFeatureId: string) {
    super("msdyn_ExportAnalyticsReport");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ExportAnalyticsReport`;

    const body: Record<string, unknown> = {
      msdyn_AnalyticsFeatureId: this.msdyn_AnalyticsFeatureId,
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

  async parseResponse(response: Response): Promise<msdyn_ExportAnalyticsReportResponse> {
    const data = await response.json();
    return msdyn_ExportAnalyticsReportResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_AnalyticsFeatureId: this.msdyn_AnalyticsFeatureId,
    };
  }
}

/**
 * msdyn_ExportAnalyticsReport response message
 */
export class msdyn_ExportAnalyticsReportResponse extends OrganizationResponse {
  constructor(public result: msdyn_ExportAnalyticsReportResponse) {
    super("msdyn_ExportAnalyticsReport");
  }

  static fromResponse(data: unknown): msdyn_ExportAnalyticsReportResponse {
    return new msdyn_ExportAnalyticsReportResponse((data as any).value);
  }
}
