import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_FacebookPageConfigurationShouldHaveWorkStreamRule action
 */
export interface msdyn_FacebookPageConfigurationShouldHaveWorkStreamRuleResponse {
  ReturnStatus: number;
  Message: string;
  ResultEntities: string;
}

/**
 * msdyn_FacebookPageConfigurationShouldHaveWorkStreamRule action
 *
 * Unbound action
 */
export class msdyn_FacebookPageConfigurationShouldHaveWorkStreamRuleAction implements Executable<msdyn_FacebookPageConfigurationShouldHaveWorkStreamRuleResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_FacebookPageConfigurationShouldHaveWorkStreamRule`;

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
  ): Promise<msdyn_FacebookPageConfigurationShouldHaveWorkStreamRuleResponse> {
    const data = await response.json();
    return data as msdyn_FacebookPageConfigurationShouldHaveWorkStreamRuleResponse;
  }
}
