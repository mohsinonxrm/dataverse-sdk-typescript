import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CustomChannelConfigurationShouldHaveWorkStreamRule action
 */
export interface msdyn_CustomChannelConfigurationShouldHaveWorkStreamRuleResponse {
  ReturnStatus: number;
  Message: string;
  ResultEntities: string;
}

/**
 * msdyn_CustomChannelConfigurationShouldHaveWorkStreamRule action
 *
 * Unbound action
 */
export class msdyn_CustomChannelConfigurationShouldHaveWorkStreamRuleAction implements Executable<msdyn_CustomChannelConfigurationShouldHaveWorkStreamRuleResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CustomChannelConfigurationShouldHaveWorkStreamRule`;

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
  ): Promise<msdyn_CustomChannelConfigurationShouldHaveWorkStreamRuleResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return {} as msdyn_CustomChannelConfigurationShouldHaveWorkStreamRuleResponse;
    return (await response.json()) as msdyn_CustomChannelConfigurationShouldHaveWorkStreamRuleResponse;
  }
}
