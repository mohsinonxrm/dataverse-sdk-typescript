import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_ExportAnalyticsReportResponse as msdyn_ExportAnalyticsReportResponseData } from "./types/index.js";

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_ExportAnalyticsReportResponse> {
    const data = await response.json();
    return msdyn_ExportAnalyticsReportResponse.fromResponse(data);
  }
}

/**
 * msdyn_ExportAnalyticsReport response message
 */
export class msdyn_ExportAnalyticsReportResponse extends OrganizationResponse {
  constructor(public result: msdyn_ExportAnalyticsReportResponseData) {
    super("msdyn_ExportAnalyticsReport");
  }

  static fromResponse(data: unknown): msdyn_ExportAnalyticsReportResponse {
    return new msdyn_ExportAnalyticsReportResponse(
      responseObject<msdyn_ExportAnalyticsReportResponseData>(data)
    );
  }
}
