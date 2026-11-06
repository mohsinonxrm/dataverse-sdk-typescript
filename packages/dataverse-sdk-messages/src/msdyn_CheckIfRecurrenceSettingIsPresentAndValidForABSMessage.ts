import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_CheckIfRecurrenceSettingIsPresentAndValidForABSResponse as msdyn_CheckIfRecurrenceSettingIsPresentAndValidForABSResponseData } from "./types/index.js";

/**
 * msdyn_CheckIfRecurrenceSettingIsPresentAndValidForABS request message
 *
 * Web API Action: msdyn_CheckIfRecurrenceSettingIsPresentAndValidForABS
 */
export class msdyn_CheckIfRecurrenceSettingIsPresentAndValidForABSRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckIfRecurrenceSettingIsPresentAndValidForABSResponse>
{
  constructor() {
    super("msdyn_CheckIfRecurrenceSettingIsPresentAndValidForABS");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckIfRecurrenceSettingIsPresentAndValidForABS`;

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
  ): Promise<msdyn_CheckIfRecurrenceSettingIsPresentAndValidForABSResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_CheckIfRecurrenceSettingIsPresentAndValidForABSResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
  }
}

/**
 * msdyn_CheckIfRecurrenceSettingIsPresentAndValidForABS response message
 */
export class msdyn_CheckIfRecurrenceSettingIsPresentAndValidForABSResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckIfRecurrenceSettingIsPresentAndValidForABSResponseData) {
    super("msdyn_CheckIfRecurrenceSettingIsPresentAndValidForABS");
  }

  static fromResponse(
    data: unknown
  ): msdyn_CheckIfRecurrenceSettingIsPresentAndValidForABSResponse {
    return new msdyn_CheckIfRecurrenceSettingIsPresentAndValidForABSResponse(
      responseObject<msdyn_CheckIfRecurrenceSettingIsPresentAndValidForABSResponseData>(data)
    );
  }
}
