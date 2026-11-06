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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GetAppModuleSettingsResponse;
    return (await response.json()) as msdyn_GetAppModuleSettingsResponse;
  }
}
