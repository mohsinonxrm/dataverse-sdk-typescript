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
    const data = await response.json();
    return data as msdyn_GBMConfigurationShouldHaveWorkStreamRuleResponse;
  }
}
