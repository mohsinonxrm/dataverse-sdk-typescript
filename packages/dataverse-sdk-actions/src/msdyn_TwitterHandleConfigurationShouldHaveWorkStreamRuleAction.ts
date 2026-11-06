import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_TwitterHandleConfigurationShouldHaveWorkStreamRule action
 */
export interface msdyn_TwitterHandleConfigurationShouldHaveWorkStreamRuleResponse {
  ReturnStatus: number;
  Message: string;
  ResultEntities: string;
}

/**
 * msdyn_TwitterHandleConfigurationShouldHaveWorkStreamRule action
 *
 * Unbound action
 */
export class msdyn_TwitterHandleConfigurationShouldHaveWorkStreamRuleAction implements Executable<msdyn_TwitterHandleConfigurationShouldHaveWorkStreamRuleResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TwitterHandleConfigurationShouldHaveWorkStreamRule`;

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
  ): Promise<msdyn_TwitterHandleConfigurationShouldHaveWorkStreamRuleResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (
      text ? JSON.parse(text) : {}
    ) as msdyn_TwitterHandleConfigurationShouldHaveWorkStreamRuleResponse;
  }
}
