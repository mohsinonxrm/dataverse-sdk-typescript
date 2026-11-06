import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetAppModuleSettingsResponse as msdyn_GetAppModuleSettingsResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_GetAppModuleSettingsResponse.fromResponse({});
    return msdyn_GetAppModuleSettingsResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GetAppModuleSettings response message
 */
export class msdyn_GetAppModuleSettingsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetAppModuleSettingsResponseData) {
    super("msdyn_GetAppModuleSettings");
  }

  static fromResponse(data: unknown): msdyn_GetAppModuleSettingsResponse {
    return new msdyn_GetAppModuleSettingsResponse(
      responseObject<msdyn_GetAppModuleSettingsResponseData>(data)
    );
  }
}
