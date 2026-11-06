import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_GBMSettingsShouldHaveAllRequiredFieldsRule action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GBMSettingsShouldHaveAllRequiredFieldsRuleResponse {
  "@odata.context"?: string;
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
}

/**
 * msdyn_GBMSettingsShouldHaveAllRequiredFieldsRule action
 *
 * Unbound action
 */
export class msdyn_GBMSettingsShouldHaveAllRequiredFieldsRuleAction implements Executable<msdyn_GBMSettingsShouldHaveAllRequiredFieldsRuleResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GBMSettingsShouldHaveAllRequiredFieldsRule`;

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
  ): Promise<msdyn_GBMSettingsShouldHaveAllRequiredFieldsRuleResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GBMSettingsShouldHaveAllRequiredFieldsRuleResponse;
  }
}
