import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_UpdateSalesCopilotUserSettingsResponse as msdyn_UpdateSalesCopilotUserSettingsResponseData } from "./types/index.js";

/**
 * msdyn_UpdateSalesCopilotUserSettings request message
 *
 * Web API Action: msdyn_UpdateSalesCopilotUserSettings
 */
export class msdyn_UpdateSalesCopilotUserSettingsRequest
  extends OrganizationRequest
  implements Executable<msdyn_UpdateSalesCopilotUserSettingsResponse>
{
  constructor(
    public msdyn_settingspayload: string,
    public msdyn_exchangeconsentgiven: string
  ) {
    super("msdyn_UpdateSalesCopilotUserSettings");
  }

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
    return msdyn_UpdateSalesCopilotUserSettingsResponse.fromResponse(data);
  }
}

/**
 * msdyn_UpdateSalesCopilotUserSettings response message
 */
export class msdyn_UpdateSalesCopilotUserSettingsResponse extends OrganizationResponse {
  constructor(public result: msdyn_UpdateSalesCopilotUserSettingsResponseData) {
    super("msdyn_UpdateSalesCopilotUserSettings");
  }

  static fromResponse(data: unknown): msdyn_UpdateSalesCopilotUserSettingsResponse {
    return new msdyn_UpdateSalesCopilotUserSettingsResponse(
      responseObject<msdyn_UpdateSalesCopilotUserSettingsResponseData>(data)
    );
  }
}
