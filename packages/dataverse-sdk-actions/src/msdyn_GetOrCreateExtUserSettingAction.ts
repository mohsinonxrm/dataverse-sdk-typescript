import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetOrCreateExtUserSetting action
 */
export interface msdyn_GetOrCreateExtUserSettingResponse {
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
    const data = await response.json();
    return data as msdyn_GetOrCreateExtUserSettingResponse;
  }
}
