import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_GetSalesAccelerationConfigurationStatus action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetSalesAccelerationConfigurationStatusResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetSalesAccelerationConfigurationStatusResponse;
  }
}
