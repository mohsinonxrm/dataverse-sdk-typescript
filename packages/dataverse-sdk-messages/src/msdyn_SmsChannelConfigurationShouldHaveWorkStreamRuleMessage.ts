import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_SmsChannelConfigurationShouldHaveWorkStreamRule request message
 *
 * Web API Action: msdyn_SmsChannelConfigurationShouldHaveWorkStreamRule
 */
export class msdyn_SmsChannelConfigurationShouldHaveWorkStreamRuleRequest
  extends OrganizationRequest
  implements Executable<msdyn_SmsChannelConfigurationShouldHaveWorkStreamRuleResponse>
{
  constructor() {
    super("msdyn_SmsChannelConfigurationShouldHaveWorkStreamRule");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SmsChannelConfigurationShouldHaveWorkStreamRule`;

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
  ): Promise<msdyn_SmsChannelConfigurationShouldHaveWorkStreamRuleResponse> {
    const data = await response.json();
    return msdyn_SmsChannelConfigurationShouldHaveWorkStreamRuleResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_SmsChannelConfigurationShouldHaveWorkStreamRule response message
 */
export class msdyn_SmsChannelConfigurationShouldHaveWorkStreamRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_SmsChannelConfigurationShouldHaveWorkStreamRuleResponse) {
    super("msdyn_SmsChannelConfigurationShouldHaveWorkStreamRule");
  }

  static fromResponse(
    data: unknown
  ): msdyn_SmsChannelConfigurationShouldHaveWorkStreamRuleResponse {
    return new msdyn_SmsChannelConfigurationShouldHaveWorkStreamRuleResponse((data as any).value);
  }
}
