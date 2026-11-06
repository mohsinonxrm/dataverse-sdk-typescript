import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_RetrieveActivityAnalyticsConfiguration action
 */
export interface msdyn_RetrieveActivityAnalyticsConfigurationResponse {
  RaProvisioningStatus: number;
  EmailEngagementEnabled: boolean;
  MarsStatus: number;
  DCIHubUrl: string;
  OrgTypeSuffix: string;
  LinkedInStatus: number;
  HealthFeatureStatus: number;
}

/**
 * Parameters of the msdyn_RetrieveActivityAnalyticsConfiguration action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RetrieveActivityAnalyticsConfigurationActionParameters {
  SIParameters?: string;
}

/**
 * msdyn_RetrieveActivityAnalyticsConfiguration action
 *
 * Unbound action
 */
export class msdyn_RetrieveActivityAnalyticsConfigurationAction implements Executable<msdyn_RetrieveActivityAnalyticsConfigurationResponse> {
  constructor(
    public readonly parameters: msdyn_RetrieveActivityAnalyticsConfigurationActionParameters = {}
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveActivityAnalyticsConfiguration`;

    const body = requestBody({
      SIParameters: this.parameters.SIParameters,
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
    return (text ? JSON.parse(text) : {}) as msdyn_RetrieveActivityAnalyticsConfigurationResponse;
  }
}
