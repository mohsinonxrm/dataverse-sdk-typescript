import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_FacebookPageConfigurationShouldHaveWorkStreamRule action
 */
export interface msdyn_FacebookPageConfigurationShouldHaveWorkStreamRuleResponse {
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
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
    // 204 No Content is an empty result
    if (response.status === 204)
      return {} as msdyn_FacebookPageConfigurationShouldHaveWorkStreamRuleResponse;
    return (await response.json()) as msdyn_FacebookPageConfigurationShouldHaveWorkStreamRuleResponse;
  }
}
