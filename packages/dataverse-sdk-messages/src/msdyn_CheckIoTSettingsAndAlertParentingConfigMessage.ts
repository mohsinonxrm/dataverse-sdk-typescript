import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_CheckIoTSettingsAndAlertParentingConfigResponse as msdyn_CheckIoTSettingsAndAlertParentingConfigResponseData } from "./types/index.js";

/**
 * msdyn_CheckIoTSettingsAndAlertParentingConfig request message
 *
 * Web API Action: msdyn_CheckIoTSettingsAndAlertParentingConfig
 */
export class msdyn_CheckIoTSettingsAndAlertParentingConfigRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckIoTSettingsAndAlertParentingConfigResponse>
{
  constructor() {
    super("msdyn_CheckIoTSettingsAndAlertParentingConfig");
  }

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
    const data = await response.json();
    return msdyn_CheckIoTSettingsAndAlertParentingConfigResponse.fromResponse(data);
  }
}

/**
 * msdyn_CheckIoTSettingsAndAlertParentingConfig response message
 */
export class msdyn_CheckIoTSettingsAndAlertParentingConfigResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckIoTSettingsAndAlertParentingConfigResponseData) {
    super("msdyn_CheckIoTSettingsAndAlertParentingConfig");
  }

  static fromResponse(data: unknown): msdyn_CheckIoTSettingsAndAlertParentingConfigResponse {
    return new msdyn_CheckIoTSettingsAndAlertParentingConfigResponse(
      responseObject<msdyn_CheckIoTSettingsAndAlertParentingConfigResponseData>(data)
    );
  }
}
