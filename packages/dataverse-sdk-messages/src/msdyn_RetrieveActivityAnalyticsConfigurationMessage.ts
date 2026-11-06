import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_RetrieveActivityAnalyticsConfigurationResponse as msdyn_RetrieveActivityAnalyticsConfigurationResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_RetrieveActivityAnalyticsConfiguration message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RetrieveActivityAnalyticsConfigurationRequestParameters {
  SIParameters?: string;
}

/**
 * msdyn_RetrieveActivityAnalyticsConfiguration request message
 *
 * Web API Action: msdyn_RetrieveActivityAnalyticsConfiguration
 */
export class msdyn_RetrieveActivityAnalyticsConfigurationRequest
  extends OrganizationRequest
  implements Executable<msdyn_RetrieveActivityAnalyticsConfigurationResponse>
{
  declare readonly Parameters: Readonly<msdyn_RetrieveActivityAnalyticsConfigurationRequestParameters>;

  constructor(parameters: msdyn_RetrieveActivityAnalyticsConfigurationRequestParameters = {}) {
    super("msdyn_RetrieveActivityAnalyticsConfiguration", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveActivityAnalyticsConfiguration`;

    const body = requestBody({
      SIParameters: this.Parameters.SIParameters,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_RetrieveActivityAnalyticsConfigurationResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_RetrieveActivityAnalyticsConfigurationResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
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
