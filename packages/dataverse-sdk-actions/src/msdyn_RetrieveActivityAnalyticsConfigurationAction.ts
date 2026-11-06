import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_RetrieveActivityAnalyticsConfiguration action
 */
export interface msdyn_RetrieveActivityAnalyticsConfigurationResponse {
  DCIHubUrl: string;
  EmailEngagementEnabled: boolean;
  HealthFeatureStatus: number;
  LinkedInStatus: number;
  MarsStatus: number;
  OrgTypeSuffix: string;
  RaProvisioningStatus: number;
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_RetrieveActivityAnalyticsConfigurationResponse;
    return (await response.json()) as msdyn_RetrieveActivityAnalyticsConfigurationResponse;
  }
}
