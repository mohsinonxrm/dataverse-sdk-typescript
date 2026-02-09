import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
 * msdyn_RetrieveActivityAnalyticsConfiguration action
 *
 * Unbound action
 */
export class msdyn_RetrieveActivityAnalyticsConfigurationAction implements Executable<msdyn_RetrieveActivityAnalyticsConfigurationResponse> {
  constructor(public readonly sIParameters: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveActivityAnalyticsConfiguration`;

    const body: Record<string, unknown> = {
      SIParameters: this.sIParameters,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_RetrieveActivityAnalyticsConfigurationResponse> {
    const data = await response.json();
    return data as msdyn_RetrieveActivityAnalyticsConfigurationResponse;
  }
}
