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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_CheckForFieldServiceSettingRecordResponse;
  }
}
