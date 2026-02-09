import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_OcChannelProviderShouldHaveAllRequiredFieldsRule request message
 *
 * Web API Action: msdyn_OcChannelProviderShouldHaveAllRequiredFieldsRule
 */
export class msdyn_OcChannelProviderShouldHaveAllRequiredFieldsRuleRequest
  extends OrganizationRequest
  implements Executable<msdyn_OcChannelProviderShouldHaveAllRequiredFieldsRuleResponse>
{
  constructor() {
    super("msdyn_OcChannelProviderShouldHaveAllRequiredFieldsRule");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_OcChannelProviderShouldHaveAllRequiredFieldsRule`;

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
  ): Promise<msdyn_OcChannelProviderShouldHaveAllRequiredFieldsRuleResponse> {
    const data = await response.json();
    return msdyn_OcChannelProviderShouldHaveAllRequiredFieldsRuleResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_OcChannelProviderShouldHaveAllRequiredFieldsRule response message
 */
export class msdyn_OcChannelProviderShouldHaveAllRequiredFieldsRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_OcChannelProviderShouldHaveAllRequiredFieldsRuleResponse) {
    super("msdyn_OcChannelProviderShouldHaveAllRequiredFieldsRule");
  }

  static fromResponse(
    data: unknown
  ): msdyn_OcChannelProviderShouldHaveAllRequiredFieldsRuleResponse {
    return new msdyn_OcChannelProviderShouldHaveAllRequiredFieldsRuleResponse((data as any).value);
  }
}
