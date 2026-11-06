import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetAnalyticsReportTokenResponse as msdyn_GetAnalyticsReportTokenResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetAnalyticsReportToken message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetAnalyticsReportTokenRequestParameters {
  AnalyticsRecordId: string;
}

/**
 * msdyn_GetAnalyticsReportToken request message
 *
 * Web API Action: msdyn_GetAnalyticsReportToken
 */
export class msdyn_GetAnalyticsReportTokenRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetAnalyticsReportTokenResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetAnalyticsReportTokenRequestParameters>;

  constructor(parameters: msdyn_GetAnalyticsReportTokenRequestParameters) {
    super("msdyn_GetAnalyticsReportToken", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetAnalyticsReportToken`;

    const body = requestBody({
      AnalyticsRecordId: this.Parameters.AnalyticsRecordId,
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

  async parseResponse(response: Response): Promise<msdyn_GetAnalyticsReportTokenResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_GetAnalyticsReportTokenResponse.fromResponse({});
    return msdyn_GetAnalyticsReportTokenResponse.fromResponse(await response.json());
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
