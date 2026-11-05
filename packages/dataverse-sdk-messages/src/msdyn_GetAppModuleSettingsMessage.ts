import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GetAppModuleSettings request message
 *
 * Web API Action: msdyn_GetAppModuleSettings
 */
export class msdyn_GetAppModuleSettingsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetAppModuleSettingsResponse>
{
  constructor() {
    super("msdyn_GetAppModuleSettings");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetAppModuleSettings`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetAppModuleSettingsResponse> {
    const data = await response.json();
    return msdyn_GetAppModuleSettingsResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_GetAppModuleSettings response message
 */
export class msdyn_GetAppModuleSettingsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetAppModuleSettingsResponse) {
    super("msdyn_GetAppModuleSettings");
  }

  static fromResponse(data: unknown): msdyn_GetAppModuleSettingsResponse {
    return new msdyn_GetAppModuleSettingsResponse((data as any).value);
  }
}
