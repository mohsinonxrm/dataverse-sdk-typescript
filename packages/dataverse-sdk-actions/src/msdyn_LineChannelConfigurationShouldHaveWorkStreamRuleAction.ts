import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_LineChannelConfigurationShouldHaveWorkStreamRule action
 */
export interface msdyn_LineChannelConfigurationShouldHaveWorkStreamRuleResponse {
  ReturnStatus: number;
  Message: string;
  ResultEntities: string;
}

/**
 * msdyn_LineChannelConfigurationShouldHaveWorkStreamRule action
 *
 * Unbound action
 */
export class msdyn_LineChannelConfigurationShouldHaveWorkStreamRuleAction implements Executable<msdyn_LineChannelConfigurationShouldHaveWorkStreamRuleResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_LineChannelConfigurationShouldHaveWorkStreamRule`;

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
  ): Promise<msdyn_LineChannelConfigurationShouldHaveWorkStreamRuleResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return {} as msdyn_LineChannelConfigurationShouldHaveWorkStreamRuleResponse;
    return (await response.json()) as msdyn_LineChannelConfigurationShouldHaveWorkStreamRuleResponse;
  }
}
