import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_UpdateSalesCopilotUserSettingsResponse as msdyn_UpdateSalesCopilotUserSettingsResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_UpdateSalesCopilotUserSettings message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UpdateSalesCopilotUserSettingsRequestParameters {
  msdyn_settingspayload: string;
  msdyn_exchangeconsentgiven: string;
}

/**
 * msdyn_UpdateSalesCopilotUserSettings request message
 *
 * Web API Action: msdyn_UpdateSalesCopilotUserSettings
 */
export class msdyn_UpdateSalesCopilotUserSettingsRequest
  extends OrganizationRequest
  implements Executable<msdyn_UpdateSalesCopilotUserSettingsResponse>
{
  declare readonly Parameters: Readonly<msdyn_UpdateSalesCopilotUserSettingsRequestParameters>;

  constructor(parameters: msdyn_UpdateSalesCopilotUserSettingsRequestParameters) {
    super("msdyn_UpdateSalesCopilotUserSettings", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateSalesCopilotUserSettings`;

    const body = requestBody({
      msdyn_settingspayload: this.Parameters.msdyn_settingspayload,
      msdyn_exchangeconsentgiven: this.Parameters.msdyn_exchangeconsentgiven,
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_UpdateSalesCopilotUserSettingsResponse.fromResponse(text ? JSON.parse(text) : {});
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
