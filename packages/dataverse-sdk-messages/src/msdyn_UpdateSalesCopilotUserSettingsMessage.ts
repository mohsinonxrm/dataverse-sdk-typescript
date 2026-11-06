import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_UpdateSalesCopilotUserSettingsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_UpdateSalesCopilotUserSettings action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_UpdateSalesCopilotUserSettingsResult {
  "@odata.context"?: string;
  msdyn_error: string;
  msdyn_status: number;
}

/**
 * msdyn_UpdateSalesCopilotUserSettings response message
 *
 * `result` is the value the msdyn_UpdateSalesCopilotUserSettings action returns (see {@link msdyn_UpdateSalesCopilotUserSettingsResult}).
 */
export class msdyn_UpdateSalesCopilotUserSettingsResponse extends OrganizationResponse {
  constructor(public result: msdyn_UpdateSalesCopilotUserSettingsResult) {
    super("msdyn_UpdateSalesCopilotUserSettings");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_UpdateSalesCopilotUserSettingsResponse {
    return new msdyn_UpdateSalesCopilotUserSettingsResponse(
      data as msdyn_UpdateSalesCopilotUserSettingsResult
    );
  }
}
