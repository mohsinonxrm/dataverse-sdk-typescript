import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_ImportAnalyticsReport message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ImportAnalyticsReportRequestParameters {
  msdyn_AnalyticsFeatureId: string;
  msdyn_OverwriteDraft?: boolean;
  msdyn_AnalyticsReportContent: string;
}

/**
 * msdyn_ImportAnalyticsReport request message
 *
 * Web API Action: msdyn_ImportAnalyticsReport
 */
export class msdyn_ImportAnalyticsReportRequest
  extends OrganizationRequest
  implements Executable<msdyn_ImportAnalyticsReportResponse>
{
  declare readonly Parameters: Readonly<msdyn_ImportAnalyticsReportRequestParameters>;

  constructor(parameters: msdyn_ImportAnalyticsReportRequestParameters) {
    super("msdyn_ImportAnalyticsReport", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ImportAnalyticsReport`;

    const body = requestBody({
      msdyn_AnalyticsFeatureId: this.Parameters.msdyn_AnalyticsFeatureId,
      msdyn_OverwriteDraft: this.Parameters.msdyn_OverwriteDraft,
      msdyn_AnalyticsReportContent: this.Parameters.msdyn_AnalyticsReportContent,
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

  async parseResponse(response: Response): Promise<msdyn_ImportAnalyticsReportResponse> {
    // No return value (204 No Content)
    return new msdyn_ImportAnalyticsReportResponse();
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
