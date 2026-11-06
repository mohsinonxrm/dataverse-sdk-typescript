import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_TeamsChannelConfigurationShouldHaveWorkStreamRule action
 */
export interface msdyn_TeamsChannelConfigurationShouldHaveWorkStreamRuleResponse {
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
}

/**
 * msdyn_TeamsChannelConfigurationShouldHaveWorkStreamRule action
 *
 * Unbound action
 */
export class msdyn_TeamsChannelConfigurationShouldHaveWorkStreamRuleAction implements Executable<msdyn_TeamsChannelConfigurationShouldHaveWorkStreamRuleResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TeamsChannelConfigurationShouldHaveWorkStreamRule`;

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
  ): Promise<msdyn_TeamsChannelConfigurationShouldHaveWorkStreamRuleResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return {} as msdyn_TeamsChannelConfigurationShouldHaveWorkStreamRuleResponse;
    return (await response.json()) as msdyn_TeamsChannelConfigurationShouldHaveWorkStreamRuleResponse;
  }
}
