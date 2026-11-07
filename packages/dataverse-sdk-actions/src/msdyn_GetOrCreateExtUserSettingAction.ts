import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_GetOrCreateExtUserSetting action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetOrCreateExtUserSettingResponse {
  "@odata.context"?: string;
  ExtUserSettingRecordId: string;
}

/**
 * msdyn_GetOrCreateExtUserSetting action
 *
 * Unbound action
 */
export class msdyn_GetOrCreateExtUserSettingAction implements Executable<msdyn_GetOrCreateExtUserSettingResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetOrCreateExtUserSetting`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetOrCreateExtUserSettingResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetOrCreateExtUserSettingResponse;
  }
}
