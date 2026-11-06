import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_WhatsAppChannelConfigurationShouldHaveWorkStreamRule action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_WhatsAppChannelConfigurationShouldHaveWorkStreamRuleResponse {
  "@odata.context"?: string;
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
}

/**
 * msdyn_WhatsAppChannelConfigurationShouldHaveWorkStreamRule action
 *
 * Unbound action
 */
export class msdyn_WhatsAppChannelConfigurationShouldHaveWorkStreamRuleAction implements Executable<msdyn_WhatsAppChannelConfigurationShouldHaveWorkStreamRuleResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_WhatsAppChannelConfigurationShouldHaveWorkStreamRule`;

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
  ): Promise<msdyn_WhatsAppChannelConfigurationShouldHaveWorkStreamRuleResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_WhatsAppChannelConfigurationShouldHaveWorkStreamRuleResponse;
  }
}
