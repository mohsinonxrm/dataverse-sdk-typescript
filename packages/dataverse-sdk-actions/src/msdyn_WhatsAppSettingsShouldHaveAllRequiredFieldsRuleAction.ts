import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_WhatsAppSettingsShouldHaveAllRequiredFieldsRule action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_WhatsAppSettingsShouldHaveAllRequiredFieldsRuleResponse {
  "@odata.context"?: string;
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
}

/**
 * msdyn_WhatsAppSettingsShouldHaveAllRequiredFieldsRule action
 *
 * Unbound action
 */
export class msdyn_WhatsAppSettingsShouldHaveAllRequiredFieldsRuleAction implements Executable<msdyn_WhatsAppSettingsShouldHaveAllRequiredFieldsRuleResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_WhatsAppSettingsShouldHaveAllRequiredFieldsRule`;

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
  ): Promise<msdyn_WhatsAppSettingsShouldHaveAllRequiredFieldsRuleResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_WhatsAppSettingsShouldHaveAllRequiredFieldsRuleResponse;
  }
}
