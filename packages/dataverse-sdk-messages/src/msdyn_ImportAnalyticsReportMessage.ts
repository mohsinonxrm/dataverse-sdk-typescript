import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_ImportAnalyticsReport request message
 *
 * Web API Action: msdyn_ImportAnalyticsReport
 */
export class msdyn_ImportAnalyticsReportRequest
  extends OrganizationRequest
  implements Executable<msdyn_ImportAnalyticsReportResponse>
{
  constructor(
    public msdyn_OverwriteDraft: boolean,
    public msdyn_AnalyticsReportContent: string,
    public msdyn_AnalyticsFeatureId: string
  ) {
    super("msdyn_ImportAnalyticsReport");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ImportAnalyticsReport`;

    const body: Record<string, unknown> = {
      msdyn_OverwriteDraft: this.msdyn_OverwriteDraft,
      msdyn_AnalyticsReportContent: this.msdyn_AnalyticsReportContent,
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

  async parseResponse(response: Response): Promise<msdyn_ImportAnalyticsReportResponse> {
    // No return value (204 No Content)
    return new msdyn_ImportAnalyticsReportResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_OverwriteDraft: this.msdyn_OverwriteDraft,
      msdyn_AnalyticsReportContent: this.msdyn_AnalyticsReportContent,
      msdyn_AnalyticsFeatureId: this.msdyn_AnalyticsFeatureId,
    };
  }
}

/**
 * msdyn_ImportAnalyticsReport response message
 */
export class msdyn_ImportAnalyticsReportResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_ImportAnalyticsReport");
  }

  static fromResponse(_data: unknown): msdyn_ImportAnalyticsReportResponse {
    return new msdyn_ImportAnalyticsReportResponse();
  }
}
