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
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_CheckIoTSettingsAndAlertParentingConfigResponse> {
    const data = await response.json();
    return data as msdyn_CheckIoTSettingsAndAlertParentingConfigResponse;
  }
}
