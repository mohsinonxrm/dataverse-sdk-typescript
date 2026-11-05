import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_CustomChannelConfigurationShouldHaveWorkStreamRule request message
 *
 * Web API Action: msdyn_CustomChannelConfigurationShouldHaveWorkStreamRule
 */
export class msdyn_CustomChannelConfigurationShouldHaveWorkStreamRuleRequest
  extends OrganizationRequest
  implements Executable<msdyn_CustomChannelConfigurationShouldHaveWorkStreamRuleResponse>
{
  constructor() {
    super("msdyn_CustomChannelConfigurationShouldHaveWorkStreamRule");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CustomChannelConfigurationShouldHaveWorkStreamRule`;

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
  ): Promise<msdyn_CustomChannelConfigurationShouldHaveWorkStreamRuleResponse> {
    const data = await response.json();
    return msdyn_CustomChannelConfigurationShouldHaveWorkStreamRuleResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_CustomChannelConfigurationShouldHaveWorkStreamRule response message
 */
export class msdyn_CustomChannelConfigurationShouldHaveWorkStreamRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_CustomChannelConfigurationShouldHaveWorkStreamRuleResponse) {
    super("msdyn_CustomChannelConfigurationShouldHaveWorkStreamRule");
  }

  static fromResponse(
    data: unknown
  ): msdyn_CustomChannelConfigurationShouldHaveWorkStreamRuleResponse {
    return new msdyn_CustomChannelConfigurationShouldHaveWorkStreamRuleResponse(
      (data as any).value
    );
  }
}
