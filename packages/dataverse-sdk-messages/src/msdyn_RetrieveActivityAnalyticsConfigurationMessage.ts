import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_RetrieveActivityAnalyticsConfigurationResponse as msdyn_RetrieveActivityAnalyticsConfigurationResponseData } from "./types/index.js";

/**
 * msdyn_RetrieveActivityAnalyticsConfiguration request message
 *
 * Web API Action: msdyn_RetrieveActivityAnalyticsConfiguration
 */
export class msdyn_RetrieveActivityAnalyticsConfigurationRequest
  extends OrganizationRequest
  implements Executable<msdyn_RetrieveActivityAnalyticsConfigurationResponse>
{
  constructor(public sIParameters: string) {
    super("msdyn_RetrieveActivityAnalyticsConfiguration");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveActivityAnalyticsConfiguration`;

    const body: Record<string, unknown> = {
      SIParameters: this.sIParameters,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_RetrieveActivityAnalyticsConfigurationResponse> {
    const data = await response.json();
    return msdyn_RetrieveActivityAnalyticsConfigurationResponse.fromResponse(data);
  }
}

/**
 * msdyn_RetrieveActivityAnalyticsConfiguration response message
 */
export class msdyn_RetrieveActivityAnalyticsConfigurationResponse extends OrganizationResponse {
  constructor(public result: msdyn_RetrieveActivityAnalyticsConfigurationResponseData) {
    super("msdyn_RetrieveActivityAnalyticsConfiguration");
  }

  static fromResponse(data: unknown): msdyn_RetrieveActivityAnalyticsConfigurationResponse {
    return new msdyn_RetrieveActivityAnalyticsConfigurationResponse(
      responseObject<msdyn_RetrieveActivityAnalyticsConfigurationResponseData>(data)
    );
  }
}
