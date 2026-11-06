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
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_WhatsAppChannelConfigurationShouldHaveWorkStreamRuleResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_WhatsAppChannelConfigurationShouldHaveWorkStreamRuleResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_WhatsAppChannelConfigurationShouldHaveWorkStreamRule action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_WhatsAppChannelConfigurationShouldHaveWorkStreamRuleResult {
  "@odata.context"?: string;
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
}

/**
 * msdyn_WhatsAppChannelConfigurationShouldHaveWorkStreamRule response message
 *
 * `result` is the value the msdyn_WhatsAppChannelConfigurationShouldHaveWorkStreamRule action returns (see {@link msdyn_WhatsAppChannelConfigurationShouldHaveWorkStreamRuleResult}).
 */
export class msdyn_WhatsAppChannelConfigurationShouldHaveWorkStreamRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_WhatsAppChannelConfigurationShouldHaveWorkStreamRuleResult) {
    super("msdyn_WhatsAppChannelConfigurationShouldHaveWorkStreamRule");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(
    data: unknown
  ): msdyn_WhatsAppChannelConfigurationShouldHaveWorkStreamRuleResponse {
    return new msdyn_WhatsAppChannelConfigurationShouldHaveWorkStreamRuleResponse(
      data as msdyn_WhatsAppChannelConfigurationShouldHaveWorkStreamRuleResult
    );
  }
}
