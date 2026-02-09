import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_SmsChannelConfigurationShouldHaveWorkStreamRule action
 */
export interface msdyn_SmsChannelConfigurationShouldHaveWorkStreamRuleResponse {
  ReturnStatus: number;
  Message: string;
  ResultEntities: string;
}

/**
 * msdyn_SmsChannelConfigurationShouldHaveWorkStreamRule action
 *
 * Unbound action
 */
export class msdyn_SmsChannelConfigurationShouldHaveWorkStreamRuleAction implements Executable<msdyn_SmsChannelConfigurationShouldHaveWorkStreamRuleResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SmsChannelConfigurationShouldHaveWorkStreamRule`;

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
  ): Promise<msdyn_SmsChannelConfigurationShouldHaveWorkStreamRuleResponse> {
    const data = await response.json();
    return data as msdyn_SmsChannelConfigurationShouldHaveWorkStreamRuleResponse;
  }
}
