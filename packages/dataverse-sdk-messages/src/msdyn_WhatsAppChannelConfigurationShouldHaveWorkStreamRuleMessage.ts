import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_WhatsAppChannelConfigurationShouldHaveWorkStreamRule request message
 *
 * Web API Action: msdyn_WhatsAppChannelConfigurationShouldHaveWorkStreamRule
 */
export class msdyn_WhatsAppChannelConfigurationShouldHaveWorkStreamRuleRequest
  extends OrganizationRequest
  implements Executable<msdyn_WhatsAppChannelConfigurationShouldHaveWorkStreamRuleResponse>
{
  constructor() {
    super("msdyn_WhatsAppChannelConfigurationShouldHaveWorkStreamRule");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_WhatsAppChannelConfigurationShouldHaveWorkStreamRule`;

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_WhatsAppChannelConfigurationShouldHaveWorkStreamRuleResponse> {
    const data = await response.json();
    return msdyn_WhatsAppChannelConfigurationShouldHaveWorkStreamRuleResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_WhatsAppChannelConfigurationShouldHaveWorkStreamRule response message
 */
export class msdyn_WhatsAppChannelConfigurationShouldHaveWorkStreamRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_WhatsAppChannelConfigurationShouldHaveWorkStreamRuleResponse) {
    super("msdyn_WhatsAppChannelConfigurationShouldHaveWorkStreamRule");
  }

  static fromResponse(
    data: unknown
  ): msdyn_WhatsAppChannelConfigurationShouldHaveWorkStreamRuleResponse {
    return new msdyn_WhatsAppChannelConfigurationShouldHaveWorkStreamRuleResponse(
      (data as any).value
    );
  }
}
