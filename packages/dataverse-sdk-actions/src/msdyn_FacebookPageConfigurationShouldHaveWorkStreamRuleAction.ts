import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_FacebookPageConfigurationShouldHaveWorkStreamRule action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_FacebookPageConfigurationShouldHaveWorkStreamRuleResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_FacebookPageConfigurationShouldHaveWorkStreamRuleResponse;
  }
}
