import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_TeamsChannelConfigurationShouldHaveWorkStreamRule action
 */
export interface msdyn_TeamsChannelConfigurationShouldHaveWorkStreamRuleResponse {
  ReturnStatus: number;
  Message: string;
  ResultEntities: string;
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
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_TeamsChannelConfigurationShouldHaveWorkStreamRuleResponse> {
    const data = await response.json();
    return data as msdyn_TeamsChannelConfigurationShouldHaveWorkStreamRuleResponse;
  }
}
