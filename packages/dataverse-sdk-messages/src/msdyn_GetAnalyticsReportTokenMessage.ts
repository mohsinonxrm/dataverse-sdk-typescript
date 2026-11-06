import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_GetAnalyticsReportTokenResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetAnalyticsReportToken action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetAnalyticsReportTokenResult {
  "@odata.context"?: string;
  Expiration: string;
  Token: string;
}

/**
 * msdyn_GetAnalyticsReportToken response message
 *
 * `result` is the value the msdyn_GetAnalyticsReportToken action returns (see {@link msdyn_GetAnalyticsReportTokenResult}).
 */
export class msdyn_GetAnalyticsReportTokenResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetAnalyticsReportTokenResult) {
    super("msdyn_GetAnalyticsReportToken");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetAnalyticsReportTokenResponse {
    return new msdyn_GetAnalyticsReportTokenResponse(data as msdyn_GetAnalyticsReportTokenResult);
  }
}
