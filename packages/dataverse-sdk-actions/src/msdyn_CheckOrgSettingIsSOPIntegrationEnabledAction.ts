import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_CheckOrgSettingIsSOPIntegrationEnabled action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CheckOrgSettingIsSOPIntegrationEnabledResponse {
  "@odata.context"?: string;
  HelpLink: string;
  Message: string;
  ResultEntities: string;
  ReturnSeverity: number;
  ReturnStatus: number;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_CheckOrgSettingIsSOPIntegrationEnabledResponse;
  }
}
