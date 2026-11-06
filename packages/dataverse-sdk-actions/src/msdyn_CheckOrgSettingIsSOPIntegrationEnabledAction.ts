import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CheckOrgSettingIsSOPIntegrationEnabled action
 */
export interface msdyn_CheckOrgSettingIsSOPIntegrationEnabledResponse {
  ReturnStatus: number;
  ResultEntities: string;
  Message: string;
  ReturnSeverity: number;
  HelpLink: string;
}

/**
 * msdyn_CheckOrgSettingIsSOPIntegrationEnabled action
 *
 * Unbound action
 */
export class msdyn_CheckOrgSettingIsSOPIntegrationEnabledAction implements Executable<msdyn_CheckOrgSettingIsSOPIntegrationEnabledResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckOrgSettingIsSOPIntegrationEnabled`;

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
  ): Promise<msdyn_CheckOrgSettingIsSOPIntegrationEnabledResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_CheckOrgSettingIsSOPIntegrationEnabledResponse;
    return (await response.json()) as msdyn_CheckOrgSettingIsSOPIntegrationEnabledResponse;
  }
}
