import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_WhatsAppChannelConfigurationShouldHaveWorkStreamRule action
 */
export interface msdyn_WhatsAppChannelConfigurationShouldHaveWorkStreamRuleResponse {
  ReturnStatus: number;
  Message: string;
  ResultEntities: string;
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
    // 204 No Content is an empty result
    if (response.status === 204)
      return {} as msdyn_WhatsAppChannelConfigurationShouldHaveWorkStreamRuleResponse;
    return (await response.json()) as msdyn_WhatsAppChannelConfigurationShouldHaveWorkStreamRuleResponse;
  }
}
