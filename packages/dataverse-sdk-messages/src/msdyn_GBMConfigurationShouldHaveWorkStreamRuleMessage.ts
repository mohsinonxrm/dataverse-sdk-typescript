import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GBMConfigurationShouldHaveWorkStreamRule request message
 *
 * Web API Action: msdyn_GBMConfigurationShouldHaveWorkStreamRule
 */
export class msdyn_GBMConfigurationShouldHaveWorkStreamRuleRequest
  extends OrganizationRequest
  implements Executable<msdyn_GBMConfigurationShouldHaveWorkStreamRuleResponse>
{
  constructor() {
    super("msdyn_GBMConfigurationShouldHaveWorkStreamRule");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GBMConfigurationShouldHaveWorkStreamRule`;

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
  ): Promise<msdyn_GBMConfigurationShouldHaveWorkStreamRuleResponse> {
    const data = await response.json();
    return msdyn_GBMConfigurationShouldHaveWorkStreamRuleResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_GBMConfigurationShouldHaveWorkStreamRule response message
 */
export class msdyn_GBMConfigurationShouldHaveWorkStreamRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_GBMConfigurationShouldHaveWorkStreamRuleResponse) {
    super("msdyn_GBMConfigurationShouldHaveWorkStreamRule");
  }

  static fromResponse(data: unknown): msdyn_GBMConfigurationShouldHaveWorkStreamRuleResponse {
    return new msdyn_GBMConfigurationShouldHaveWorkStreamRuleResponse((data as any).value);
  }
}
