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
    // The body is the complex value, with its @odata.context
    return msdyn_GetAppModuleSettingsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetAppModuleSettings action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetAppModuleSettingsResult {
  "@odata.context"?: string;
  msdyn_output: string;
}

/**
 * msdyn_GetAppModuleSettings response message
 *
 * `result` is the value the msdyn_GetAppModuleSettings action returns (see {@link msdyn_GetAppModuleSettingsResult}).
 */
export class msdyn_GetAppModuleSettingsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetAppModuleSettingsResult) {
    super("msdyn_GetAppModuleSettings");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetAppModuleSettingsResponse {
    return new msdyn_GetAppModuleSettingsResponse(data as msdyn_GetAppModuleSettingsResult);
  }
}
