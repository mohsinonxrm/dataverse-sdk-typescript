import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_FacebookPageConfigurationShouldHaveWorkStreamRule request message
 *
 * Web API Action: msdyn_FacebookPageConfigurationShouldHaveWorkStreamRule
 */
export class msdyn_FacebookPageConfigurationShouldHaveWorkStreamRuleRequest
  extends OrganizationRequest
  implements Executable<msdyn_FacebookPageConfigurationShouldHaveWorkStreamRuleResponse>
{
  constructor() {
    super("msdyn_FacebookPageConfigurationShouldHaveWorkStreamRule");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_FacebookPageConfigurationShouldHaveWorkStreamRule`;

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
  ): Promise<msdyn_FacebookPageConfigurationShouldHaveWorkStreamRuleResponse> {
    const data = await response.json();
    return msdyn_FacebookPageConfigurationShouldHaveWorkStreamRuleResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_FacebookPageConfigurationShouldHaveWorkStreamRule response message
 */
export class msdyn_FacebookPageConfigurationShouldHaveWorkStreamRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_FacebookPageConfigurationShouldHaveWorkStreamRuleResponse) {
    super("msdyn_FacebookPageConfigurationShouldHaveWorkStreamRule");
  }

  static fromResponse(
    data: unknown
  ): msdyn_FacebookPageConfigurationShouldHaveWorkStreamRuleResponse {
    return new msdyn_FacebookPageConfigurationShouldHaveWorkStreamRuleResponse((data as any).value);
  }
}
