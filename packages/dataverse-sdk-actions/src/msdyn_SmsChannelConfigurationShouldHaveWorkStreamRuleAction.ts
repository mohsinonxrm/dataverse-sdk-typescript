import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_SmsChannelConfigurationShouldHaveWorkStreamRule action
 */
export interface msdyn_SmsChannelConfigurationShouldHaveWorkStreamRuleResponse {
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
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
    // 204 No Content is an empty result
    if (response.status === 204)
      return {} as msdyn_SmsChannelConfigurationShouldHaveWorkStreamRuleResponse;
    return (await response.json()) as msdyn_SmsChannelConfigurationShouldHaveWorkStreamRuleResponse;
  }
}
