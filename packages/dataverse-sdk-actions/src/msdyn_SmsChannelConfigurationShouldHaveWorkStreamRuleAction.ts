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
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_SmsChannelConfigurationShouldHaveWorkStreamRuleResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (
      text ? JSON.parse(text) : {}
    ) as msdyn_SmsChannelConfigurationShouldHaveWorkStreamRuleResponse;
  }
}
