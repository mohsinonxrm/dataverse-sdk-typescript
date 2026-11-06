import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_TwitterHandleConfigurationShouldHaveWorkStreamRule action
 */
export interface msdyn_TwitterHandleConfigurationShouldHaveWorkStreamRuleResponse {
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
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
    // 204 No Content is an empty result
    if (response.status === 204)
      return {} as msdyn_TwitterHandleConfigurationShouldHaveWorkStreamRuleResponse;
    return (await response.json()) as msdyn_TwitterHandleConfigurationShouldHaveWorkStreamRuleResponse;
  }
}
