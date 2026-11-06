import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CheckIoTSettingsAndAlertParentingConfig action
 */
export interface msdyn_CheckIoTSettingsAndAlertParentingConfigResponse {
  ReturnStatus: number;
  ResultEntities: string;
  Message: string;
}

/**
 * msdyn_CheckIoTSettingsAndAlertParentingConfig action
 *
 * Unbound action
 */
export class msdyn_CheckIoTSettingsAndAlertParentingConfigAction implements Executable<msdyn_CheckIoTSettingsAndAlertParentingConfigResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckIoTSettingsAndAlertParentingConfig`;

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
  ): Promise<msdyn_CheckIoTSettingsAndAlertParentingConfigResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_CheckIoTSettingsAndAlertParentingConfigResponse;
    return (await response.json()) as msdyn_CheckIoTSettingsAndAlertParentingConfigResponse;
  }
}
