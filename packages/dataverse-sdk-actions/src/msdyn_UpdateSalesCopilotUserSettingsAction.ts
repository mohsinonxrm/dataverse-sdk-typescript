import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_UpdateSalesCopilotUserSettings action
 */
export interface msdyn_UpdateSalesCopilotUserSettingsResponse {
  msdyn_status: number;
  msdyn_error: string;
}

/**
 * msdyn_UpdateSalesCopilotUserSettings action
 *
 * Unbound action
 */
export class msdyn_UpdateSalesCopilotUserSettingsAction implements Executable<msdyn_UpdateSalesCopilotUserSettingsResponse> {
  constructor(
    public readonly msdyn_settingspayload: string,
    public readonly msdyn_exchangeconsentgiven: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateSalesCopilotUserSettings`;

    const body: Record<string, unknown> = {
      msdyn_settingspayload: this.msdyn_settingspayload,
      msdyn_exchangeconsentgiven: this.msdyn_exchangeconsentgiven,
    };

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
    const data = await response.json();
    return data as msdyn_UpdateSalesCopilotUserSettingsResponse;
  }
}
