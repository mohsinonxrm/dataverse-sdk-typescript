import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_GetOrCreateExtUserSetting response message
 */
export class msdyn_GetOrCreateExtUserSettingResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetOrCreateExtUserSettingResponse) {
    super("msdyn_GetOrCreateExtUserSetting");
  }

  static fromResponse(data: unknown): msdyn_GetOrCreateExtUserSettingResponse {
    return new msdyn_GetOrCreateExtUserSettingResponse((data as any).value);
  }
}
