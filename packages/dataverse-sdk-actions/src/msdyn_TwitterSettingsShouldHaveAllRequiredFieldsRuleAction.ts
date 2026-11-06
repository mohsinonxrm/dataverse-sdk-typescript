import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_TwitterSettingsShouldHaveAllRequiredFieldsRule action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_TwitterSettingsShouldHaveAllRequiredFieldsRuleResponse {
  "@odata.context"?: string;
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
}

/**
 * msdyn_TwitterSettingsShouldHaveAllRequiredFieldsRule action
 *
 * Unbound action
 */
export class msdyn_TwitterSettingsShouldHaveAllRequiredFieldsRuleAction implements Executable<msdyn_TwitterSettingsShouldHaveAllRequiredFieldsRuleResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TwitterSettingsShouldHaveAllRequiredFieldsRule`;

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
  ): Promise<msdyn_TwitterSettingsShouldHaveAllRequiredFieldsRuleResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_TwitterSettingsShouldHaveAllRequiredFieldsRuleResponse;
  }
}
