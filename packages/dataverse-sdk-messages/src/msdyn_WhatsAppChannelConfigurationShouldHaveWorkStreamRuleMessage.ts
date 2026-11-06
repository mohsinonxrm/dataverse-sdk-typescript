import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_WhatsAppChannelConfigurationShouldHaveWorkStreamRuleResponse as msdyn_WhatsAppChannelConfigurationShouldHaveWorkStreamRuleResponseData } from "./types/index.js";

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
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_WhatsAppChannelConfigurationShouldHaveWorkStreamRuleResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_WhatsAppChannelConfigurationShouldHaveWorkStreamRuleResponse.fromResponse({});
    return msdyn_WhatsAppChannelConfigurationShouldHaveWorkStreamRuleResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * msdyn_WhatsAppChannelConfigurationShouldHaveWorkStreamRule response message
 */
export class msdyn_WhatsAppChannelConfigurationShouldHaveWorkStreamRuleResponse extends OrganizationResponse {
  constructor(
    public result: msdyn_WhatsAppChannelConfigurationShouldHaveWorkStreamRuleResponseData
  ) {
    super("msdyn_WhatsAppChannelConfigurationShouldHaveWorkStreamRule");
  }

  static fromResponse(
    data: unknown
  ): msdyn_WhatsAppChannelConfigurationShouldHaveWorkStreamRuleResponse {
    return new msdyn_WhatsAppChannelConfigurationShouldHaveWorkStreamRuleResponse(
      responseObject<msdyn_WhatsAppChannelConfigurationShouldHaveWorkStreamRuleResponseData>(data)
    );
  }
}
