import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_WeChatSettingsShouldHaveAllRequiredFieldsRule action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_WeChatSettingsShouldHaveAllRequiredFieldsRuleResponse {
  "@odata.context"?: string;
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
}

/**
 * msdyn_WeChatSettingsShouldHaveAllRequiredFieldsRule action
 *
 * Unbound action
 */
export class msdyn_WeChatSettingsShouldHaveAllRequiredFieldsRuleAction implements Executable<msdyn_WeChatSettingsShouldHaveAllRequiredFieldsRuleResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_WeChatSettingsShouldHaveAllRequiredFieldsRule`;

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
  ): Promise<msdyn_WeChatSettingsShouldHaveAllRequiredFieldsRuleResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_WeChatSettingsShouldHaveAllRequiredFieldsRuleResponse;
  }
}
