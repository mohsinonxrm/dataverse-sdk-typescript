import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_ProvisionAnalyticsResponse as msdyn_ProvisionAnalyticsResponseData } from "./types/index.js";

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_ProvisionAnalyticsResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_ProvisionAnalytics response message
 */
export class msdyn_ProvisionAnalyticsResponse extends OrganizationResponse {
  constructor(public result: msdyn_ProvisionAnalyticsResponseData) {
    super("msdyn_ProvisionAnalytics");
  }

  static fromResponse(data: unknown): msdyn_ProvisionAnalyticsResponse {
    return new msdyn_ProvisionAnalyticsResponse(
      responseObject<msdyn_ProvisionAnalyticsResponseData>(data)
    );
  }
}
