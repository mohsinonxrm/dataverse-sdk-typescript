import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CheckOrgSettingOOBPriceCalculationEnabled action
 */
export interface msdyn_CheckOrgSettingOOBPriceCalculationEnabledResponse {
  ReturnStatus: number;
  ResultEntities: string;
  Message: string;
  ReturnSeverity: number;
  HelpLink: string;
}

/**
 * msdyn_CheckOrgSettingOOBPriceCalculationEnabled action
 *
 * Unbound action
 */
export class msdyn_CheckOrgSettingOOBPriceCalculationEnabledAction implements Executable<msdyn_CheckOrgSettingOOBPriceCalculationEnabledResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckOrgSettingOOBPriceCalculationEnabled`;

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
  ): Promise<msdyn_CheckOrgSettingOOBPriceCalculationEnabledResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return {} as msdyn_CheckOrgSettingOOBPriceCalculationEnabledResponse;
    return (await response.json()) as msdyn_CheckOrgSettingOOBPriceCalculationEnabledResponse;
  }
}
