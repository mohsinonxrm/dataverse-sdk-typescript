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
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_GetSalesAccelerationConfigurationStatusResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_GetSalesAccelerationConfigurationStatusResponse;
  }
}
