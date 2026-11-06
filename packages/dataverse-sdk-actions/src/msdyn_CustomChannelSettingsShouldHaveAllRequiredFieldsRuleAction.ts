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
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_CustomChannelSettingsShouldHaveAllRequiredFieldsRuleResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (
      text ? JSON.parse(text) : {}
    ) as msdyn_CustomChannelSettingsShouldHaveAllRequiredFieldsRuleResponse;
  }
}
