import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
    const data = await response.json();
    return msdyn_CheckIfRecurrenceSettingIsPresentAndValidForABSResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_CheckIfRecurrenceSettingIsPresentAndValidForABS response message
 */
export class msdyn_CheckIfRecurrenceSettingIsPresentAndValidForABSResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckIfRecurrenceSettingIsPresentAndValidForABSResponse) {
    super("msdyn_CheckIfRecurrenceSettingIsPresentAndValidForABS");
  }

  static fromResponse(
    data: unknown
  ): msdyn_CheckIfRecurrenceSettingIsPresentAndValidForABSResponse {
    return new msdyn_CheckIfRecurrenceSettingIsPresentAndValidForABSResponse((data as any).value);
  }
}
