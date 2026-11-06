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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (
      text ? JSON.parse(text) : {}
    ) as msdyn_OcChannelProviderShouldHaveAllRequiredFieldsRuleResponse;
  }
}
