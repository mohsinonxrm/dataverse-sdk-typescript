import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GBMConfigurationShouldHaveWorkStreamRule action
 */
export interface msdyn_GBMConfigurationShouldHaveWorkStreamRuleResponse {
  ReturnStatus: number;
  Message: string;
  ResultEntities: string;
}

/**
 * msdyn_GBMConfigurationShouldHaveWorkStreamRule action
 *
 * Unbound action
 */
export class msdyn_GBMConfigurationShouldHaveWorkStreamRuleAction implements Executable<msdyn_GBMConfigurationShouldHaveWorkStreamRuleResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GBMConfigurationShouldHaveWorkStreamRule`;

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
  ): Promise<msdyn_GBMConfigurationShouldHaveWorkStreamRuleResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return {} as msdyn_GBMConfigurationShouldHaveWorkStreamRuleResponse;
    return (await response.json()) as msdyn_GBMConfigurationShouldHaveWorkStreamRuleResponse;
  }
}
