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
    // The body is the complex value, with its @odata.context
    return msdyn_GetOrCreateExtUserSettingResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetOrCreateExtUserSetting action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetOrCreateExtUserSettingResult {
  "@odata.context"?: string;
  ExtUserSettingRecordId: string;
}

/**
 * msdyn_GetOrCreateExtUserSetting response message
 *
 * `result` is the value the msdyn_GetOrCreateExtUserSetting action returns (see {@link msdyn_GetOrCreateExtUserSettingResult}).
 */
export class msdyn_GetOrCreateExtUserSettingResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetOrCreateExtUserSettingResult) {
    super("msdyn_GetOrCreateExtUserSetting");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetOrCreateExtUserSettingResponse {
    return new msdyn_GetOrCreateExtUserSettingResponse(
      data as msdyn_GetOrCreateExtUserSettingResult
    );
  }
}
