import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetAppModuleSettings action
 */
export interface msdyn_GetAppModuleSettingsResponse {
  msdyn_output: string;
}

/**
 * msdyn_GetAppModuleSettings action
 *
 * Unbound action
 */
export class msdyn_GetAppModuleSettingsAction implements Executable<msdyn_GetAppModuleSettingsResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetAppModuleSettings`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetAppModuleSettingsResponse> {
    const data = await response.json();
    return data as msdyn_GetAppModuleSettingsResponse;
  }
}
