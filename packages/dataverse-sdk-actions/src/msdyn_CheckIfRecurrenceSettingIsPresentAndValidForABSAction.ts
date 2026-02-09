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
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_CheckIfRecurrenceSettingIsPresentAndValidForABSResponse> {
    const data = await response.json();
    return data as msdyn_CheckIfRecurrenceSettingIsPresentAndValidForABSResponse;
  }
}
