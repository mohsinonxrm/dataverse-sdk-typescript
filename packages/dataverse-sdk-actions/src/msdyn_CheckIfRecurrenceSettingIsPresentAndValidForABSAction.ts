import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CheckIfRecurrenceSettingIsPresentAndValidForABS action
 */
export interface msdyn_CheckIfRecurrenceSettingIsPresentAndValidForABSResponse {
  Message: string;
  ReturnStatus: number;
  ResultEntities: string;
  HelpLink: string;
}

/**
 * msdyn_CheckIfRecurrenceSettingIsPresentAndValidForABS action
 *
 * Unbound action
 */
export class msdyn_CheckIfRecurrenceSettingIsPresentAndValidForABSAction implements Executable<msdyn_CheckIfRecurrenceSettingIsPresentAndValidForABSResponse> {
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
    return (
      text ? JSON.parse(text) : {}
    ) as msdyn_CheckIfRecurrenceSettingIsPresentAndValidForABSResponse;
  }
}
