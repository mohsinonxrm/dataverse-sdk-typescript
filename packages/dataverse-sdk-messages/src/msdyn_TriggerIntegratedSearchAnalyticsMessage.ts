import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_TriggerIntegratedSearchAnalyticsResponse as msdyn_TriggerIntegratedSearchAnalyticsResponseData } from "./types/index.js";

/**
 * msdyn_TriggerIntegratedSearchAnalytics request message
 *
 * Web API Action: msdyn_TriggerIntegratedSearchAnalytics
 */
export class msdyn_TriggerIntegratedSearchAnalyticsRequest
  extends OrganizationRequest
  implements Executable<msdyn_TriggerIntegratedSearchAnalyticsResponse>
{
  constructor() {
    super("msdyn_TriggerIntegratedSearchAnalytics");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TriggerIntegratedSearchAnalytics`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_TriggerIntegratedSearchAnalyticsResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_TriggerIntegratedSearchAnalyticsResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
  }
}

/**
 * msdyn_TriggerIntegratedSearchAnalytics response message
 */
export class msdyn_TriggerIntegratedSearchAnalyticsResponse extends OrganizationResponse {
  constructor(public result: msdyn_TriggerIntegratedSearchAnalyticsResponseData) {
    super("msdyn_TriggerIntegratedSearchAnalytics");
  }

  static fromResponse(data: unknown): msdyn_TriggerIntegratedSearchAnalyticsResponse {
    return new msdyn_TriggerIntegratedSearchAnalyticsResponse(
      responseObject<msdyn_TriggerIntegratedSearchAnalyticsResponseData>(data)
    );
  }
}
