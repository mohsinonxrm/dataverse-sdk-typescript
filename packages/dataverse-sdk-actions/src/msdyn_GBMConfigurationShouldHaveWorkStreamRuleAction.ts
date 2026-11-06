import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_GBMConfigurationShouldHaveWorkStreamRule action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GBMConfigurationShouldHaveWorkStreamRuleResponse {
  "@odata.context"?: string;
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GBMConfigurationShouldHaveWorkStreamRuleResponse;
  }
}
