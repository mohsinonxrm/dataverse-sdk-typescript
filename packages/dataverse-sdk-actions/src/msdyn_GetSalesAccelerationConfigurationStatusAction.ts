import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetSalesAccelerationConfigurationStatus action
 */
export interface msdyn_GetSalesAccelerationConfigurationStatusResponse {
  IsEnabledForOrganization: boolean;
  IsEnabledForUser: boolean;
  SettingsInstance: string;
}

/**
 * msdyn_GetSalesAccelerationConfigurationStatus action
 *
 * Unbound action
 */
export class msdyn_GetSalesAccelerationConfigurationStatusAction implements Executable<msdyn_GetSalesAccelerationConfigurationStatusResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSalesAccelerationConfigurationStatus`;

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_GetSalesAccelerationConfigurationStatusResponse> {
    const data = await response.json();
    return data as msdyn_GetSalesAccelerationConfigurationStatusResponse;
  }
}
