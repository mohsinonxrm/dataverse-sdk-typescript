import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_ProvisionAnalytics request message
 *
 * Web API Action: msdyn_ProvisionAnalytics
 */
export class msdyn_ProvisionAnalyticsRequest
  extends OrganizationRequest
  implements Executable<msdyn_ProvisionAnalyticsResponse>
{
  constructor() {
    super("msdyn_ProvisionAnalytics");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ProvisionAnalytics`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_ProvisionAnalyticsResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_ProvisionAnalyticsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_ProvisionAnalytics action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ProvisionAnalyticsResult {
  "@odata.context"?: string;
  msdyn_response: string;
}

/**
 * msdyn_ProvisionAnalytics response message
 *
 * `result` is the value the msdyn_ProvisionAnalytics action returns (see {@link msdyn_ProvisionAnalyticsResult}).
 */
export class msdyn_ProvisionAnalyticsResponse extends OrganizationResponse {
  constructor(public result: msdyn_ProvisionAnalyticsResult) {
    super("msdyn_ProvisionAnalytics");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_ProvisionAnalyticsResponse {
    return new msdyn_ProvisionAnalyticsResponse(data as msdyn_ProvisionAnalyticsResult);
  }
}
