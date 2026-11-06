import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_ExportAnalyticsReportResponse as msdyn_ExportAnalyticsReportResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_ExportAnalyticsReportResponse.fromResponse({});
    return msdyn_ExportAnalyticsReportResponse.fromResponse(await response.json());
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
