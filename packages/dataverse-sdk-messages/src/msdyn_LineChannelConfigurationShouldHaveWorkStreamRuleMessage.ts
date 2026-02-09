import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_LineChannelConfigurationShouldHaveWorkStreamRule request message
 *
 * Web API Action: msdyn_LineChannelConfigurationShouldHaveWorkStreamRule
 */
export class msdyn_LineChannelConfigurationShouldHaveWorkStreamRuleRequest
  extends OrganizationRequest
  implements Executable<msdyn_LineChannelConfigurationShouldHaveWorkStreamRuleResponse>
{
  constructor() {
    super("msdyn_LineChannelConfigurationShouldHaveWorkStreamRule");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_LineChannelConfigurationShouldHaveWorkStreamRule`;

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
  ): Promise<msdyn_LineChannelConfigurationShouldHaveWorkStreamRuleResponse> {
    const data = await response.json();
    return msdyn_LineChannelConfigurationShouldHaveWorkStreamRuleResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_LineChannelConfigurationShouldHaveWorkStreamRule response message
 */
export class msdyn_LineChannelConfigurationShouldHaveWorkStreamRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_LineChannelConfigurationShouldHaveWorkStreamRuleResponse) {
    super("msdyn_LineChannelConfigurationShouldHaveWorkStreamRule");
  }

  static fromResponse(
    data: unknown
  ): msdyn_LineChannelConfigurationShouldHaveWorkStreamRuleResponse {
    return new msdyn_LineChannelConfigurationShouldHaveWorkStreamRuleResponse((data as any).value);
  }
}
