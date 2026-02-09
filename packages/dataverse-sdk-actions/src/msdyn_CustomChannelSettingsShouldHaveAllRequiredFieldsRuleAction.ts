import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CustomChannelSettingsShouldHaveAllRequiredFieldsRule action
 */
export interface msdyn_CustomChannelSettingsShouldHaveAllRequiredFieldsRuleResponse {
  ReturnStatus: number;
  ResultEntities: string;
  Message: string;
}

/**
 * msdyn_CustomChannelSettingsShouldHaveAllRequiredFieldsRule action
 *
 * Unbound action
 */
export class msdyn_CustomChannelSettingsShouldHaveAllRequiredFieldsRuleAction implements Executable<msdyn_CustomChannelSettingsShouldHaveAllRequiredFieldsRuleResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CustomChannelSettingsShouldHaveAllRequiredFieldsRule`;

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
  ): Promise<msdyn_CustomChannelSettingsShouldHaveAllRequiredFieldsRuleResponse> {
    const data = await response.json();
    return data as msdyn_CustomChannelSettingsShouldHaveAllRequiredFieldsRuleResponse;
  }
}
