import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
    const data = await response.json();
    return msdyn_TriggerIntegratedSearchAnalyticsResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_TriggerIntegratedSearchAnalytics response message
 */
export class msdyn_TriggerIntegratedSearchAnalyticsResponse extends OrganizationResponse {
  constructor(public result: msdyn_TriggerIntegratedSearchAnalyticsResponse) {
    super("msdyn_TriggerIntegratedSearchAnalytics");
  }

  static fromResponse(data: unknown): msdyn_TriggerIntegratedSearchAnalyticsResponse {
    return new msdyn_TriggerIntegratedSearchAnalyticsResponse((data as any).value);
  }
}
