import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_UpdateSalesCopilotUserSettings action
 */
export interface msdyn_UpdateSalesCopilotUserSettingsResponse {
  msdyn_error: string;
  msdyn_status: number;
}

/**
 * Parameters of the msdyn_UpdateSalesCopilotUserSettings action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UpdateSalesCopilotUserSettingsActionParameters {
  msdyn_settingspayload: string;
  msdyn_exchangeconsentgiven: string;
}

/**
 * msdyn_UpdateSalesCopilotUserSettings action
 *
 * Unbound action
 */
export class msdyn_UpdateSalesCopilotUserSettingsAction implements Executable<msdyn_UpdateSalesCopilotUserSettingsResponse> {
  constructor(public readonly parameters: msdyn_UpdateSalesCopilotUserSettingsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateSalesCopilotUserSettings`;

    const body = requestBody({
      msdyn_settingspayload: this.parameters.msdyn_settingspayload,
      msdyn_exchangeconsentgiven: this.parameters.msdyn_exchangeconsentgiven,
    });

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_UpdateSalesCopilotUserSettingsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_UpdateSalesCopilotUserSettingsResponse;
    return (await response.json()) as msdyn_UpdateSalesCopilotUserSettingsResponse;
  }
}
