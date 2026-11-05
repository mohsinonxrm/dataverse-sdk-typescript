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
    const data = await response.json();
    return data as msdyn_TwitterHandleConfigurationShouldHaveWorkStreamRuleResponse;
  }
}
