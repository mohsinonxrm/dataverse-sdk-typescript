import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CheckForFieldServiceSettingRecord action
 */
export interface msdyn_CheckForFieldServiceSettingRecordResponse {
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
  ReturnSeverity: number;
  ReturnLevel: number;
  HelpLink: string;
}

/**
 * msdyn_CheckForFieldServiceSettingRecord action
 *
 * Unbound action
 */
export class msdyn_CheckForFieldServiceSettingRecordAction implements Executable<msdyn_CheckForFieldServiceSettingRecordResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForFieldServiceSettingRecord`;

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
  ): Promise<msdyn_CheckForFieldServiceSettingRecordResponse> {
    const data = await response.json();
    return data as msdyn_CheckForFieldServiceSettingRecordResponse;
  }
}
