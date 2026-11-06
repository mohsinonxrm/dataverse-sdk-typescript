import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_OcChannelProviderShouldHaveAllRequiredFieldsRule action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_OcChannelProviderShouldHaveAllRequiredFieldsRuleResponse {
  "@odata.context"?: string;
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_OcChannelProviderShouldHaveAllRequiredFieldsRuleResponse;
  }
}
