import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_CheckOrgSettingOOBPriceCalculationEnabled action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CheckOrgSettingOOBPriceCalculationEnabledResponse {
  "@odata.context"?: string;
  HelpLink: string;
  Message: string;
  ResultEntities: string;
  ReturnSeverity: number;
  ReturnStatus: number;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_CheckOrgSettingOOBPriceCalculationEnabledResponse;
  }
}
