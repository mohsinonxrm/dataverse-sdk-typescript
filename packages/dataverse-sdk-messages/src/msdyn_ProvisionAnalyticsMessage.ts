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
    const data = await response.json();
    return msdyn_ProvisionAnalyticsResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_ProvisionAnalytics response message
 */
export class msdyn_ProvisionAnalyticsResponse extends OrganizationResponse {
  constructor(public result: msdyn_ProvisionAnalyticsResponse) {
    super("msdyn_ProvisionAnalytics");
  }

  static fromResponse(data: unknown): msdyn_ProvisionAnalyticsResponse {
    return new msdyn_ProvisionAnalyticsResponse((data as any).value);
  }
}
