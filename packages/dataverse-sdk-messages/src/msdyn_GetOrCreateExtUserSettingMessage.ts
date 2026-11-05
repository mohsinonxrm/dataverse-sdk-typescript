import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetOrCreateExtUserSettingResponse as msdyn_GetOrCreateExtUserSettingResponseData } from "./types/index.js";

/**
 * msdyn_GetOrCreateExtUserSetting request message
 *
 * Web API Action: msdyn_GetOrCreateExtUserSetting
 */
export class msdyn_GetOrCreateExtUserSettingRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetOrCreateExtUserSettingResponse>
{
  constructor() {
    super("msdyn_GetOrCreateExtUserSetting");
  }

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
    return msdyn_GetOrCreateExtUserSettingResponse.fromResponse(data);
  }
}

/**
 * msdyn_GetOrCreateExtUserSetting response message
 */
export class msdyn_GetOrCreateExtUserSettingResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetOrCreateExtUserSettingResponseData) {
    super("msdyn_GetOrCreateExtUserSetting");
  }

  static fromResponse(data: unknown): msdyn_GetOrCreateExtUserSettingResponse {
    return new msdyn_GetOrCreateExtUserSettingResponse(
      responseObject<msdyn_GetOrCreateExtUserSettingResponseData>(data)
    );
  }
}
