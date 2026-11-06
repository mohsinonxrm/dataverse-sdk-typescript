import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_RetrieveActivityAnalyticsConfigurationResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_RetrieveActivityAnalyticsConfiguration action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_RetrieveActivityAnalyticsConfigurationResult {
  "@odata.context"?: string;
  DCIHubUrl: string;
  EmailEngagementEnabled: boolean;
  HealthFeatureStatus: number;
  LinkedInStatus: number;
  MarsStatus: number;
  OrgTypeSuffix: string;
  RaProvisioningStatus: number;
}

/**
 * msdyn_RetrieveActivityAnalyticsConfiguration response message
 *
 * `result` is the value the msdyn_RetrieveActivityAnalyticsConfiguration action returns (see {@link msdyn_RetrieveActivityAnalyticsConfigurationResult}).
 */
export class msdyn_RetrieveActivityAnalyticsConfigurationResponse extends OrganizationResponse {
  constructor(public result: msdyn_RetrieveActivityAnalyticsConfigurationResult) {
    super("msdyn_RetrieveActivityAnalyticsConfiguration");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_RetrieveActivityAnalyticsConfigurationResponse {
    return new msdyn_RetrieveActivityAnalyticsConfigurationResponse(
      data as msdyn_RetrieveActivityAnalyticsConfigurationResult
    );
  }
}
