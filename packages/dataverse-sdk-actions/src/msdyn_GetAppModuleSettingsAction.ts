import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_GetAppModuleSettings action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetAppModuleSettingsResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetAppModuleSettingsResponse;
  }
}
