import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_OcChannelProviderShouldHaveAllRequiredFieldsRule action
 */
export interface msdyn_OcChannelProviderShouldHaveAllRequiredFieldsRuleResponse {
  ReturnStatus: number;
  Message: string;
  ResultEntities: string;
}

/**
 * msdyn_OcChannelProviderShouldHaveAllRequiredFieldsRule action
 *
 * Unbound action
 */
export class msdyn_OcChannelProviderShouldHaveAllRequiredFieldsRuleAction implements Executable<msdyn_OcChannelProviderShouldHaveAllRequiredFieldsRuleResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_OcChannelProviderShouldHaveAllRequiredFieldsRule`;

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
  ): Promise<msdyn_OcChannelProviderShouldHaveAllRequiredFieldsRuleResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return {} as msdyn_OcChannelProviderShouldHaveAllRequiredFieldsRuleResponse;
    return (await response.json()) as msdyn_OcChannelProviderShouldHaveAllRequiredFieldsRuleResponse;
  }
}
