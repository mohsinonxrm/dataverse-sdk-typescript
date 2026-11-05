import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetAnalyticsReportTokenResponse as msdyn_GetAnalyticsReportTokenResponseData } from "./types/index.js";

/**
 * msdyn_GetAnalyticsReportToken request message
 *
 * Web API Action: msdyn_GetAnalyticsReportToken
 */
export class msdyn_GetAnalyticsReportTokenRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetAnalyticsReportTokenResponse>
{
  constructor(public analyticsRecordId: string) {
    super("msdyn_GetAnalyticsReportToken");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetAnalyticsReportToken`;

    const body: Record<string, unknown> = {
      AnalyticsRecordId: this.analyticsRecordId,
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

  async parseResponse(response: Response): Promise<msdyn_GetAnalyticsReportTokenResponse> {
    const data = await response.json();
    return msdyn_GetAnalyticsReportTokenResponse.fromResponse(data);
  }
}

/**
 * msdyn_GetAnalyticsReportToken response message
 */
export class msdyn_GetAnalyticsReportTokenResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetAnalyticsReportTokenResponseData) {
    super("msdyn_GetAnalyticsReportToken");
  }

  static fromResponse(data: unknown): msdyn_GetAnalyticsReportTokenResponse {
    return new msdyn_GetAnalyticsReportTokenResponse(
      responseObject<msdyn_GetAnalyticsReportTokenResponseData>(data)
    );
  }
}
