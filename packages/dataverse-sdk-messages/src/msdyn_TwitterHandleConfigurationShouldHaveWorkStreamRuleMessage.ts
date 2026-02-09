import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_TwitterHandleConfigurationShouldHaveWorkStreamRule request message
 *
 * Web API Action: msdyn_TwitterHandleConfigurationShouldHaveWorkStreamRule
 */
export class msdyn_TwitterHandleConfigurationShouldHaveWorkStreamRuleRequest
  extends OrganizationRequest
  implements Executable<msdyn_TwitterHandleConfigurationShouldHaveWorkStreamRuleResponse>
{
  constructor() {
    super("msdyn_TwitterHandleConfigurationShouldHaveWorkStreamRule");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TwitterHandleConfigurationShouldHaveWorkStreamRule`;

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
  ): Promise<msdyn_TwitterHandleConfigurationShouldHaveWorkStreamRuleResponse> {
    const data = await response.json();
    return msdyn_TwitterHandleConfigurationShouldHaveWorkStreamRuleResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_TwitterHandleConfigurationShouldHaveWorkStreamRule response message
 */
export class msdyn_TwitterHandleConfigurationShouldHaveWorkStreamRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_TwitterHandleConfigurationShouldHaveWorkStreamRuleResponse) {
    super("msdyn_TwitterHandleConfigurationShouldHaveWorkStreamRule");
  }

  static fromResponse(
    data: unknown
  ): msdyn_TwitterHandleConfigurationShouldHaveWorkStreamRuleResponse {
    return new msdyn_TwitterHandleConfigurationShouldHaveWorkStreamRuleResponse(
      (data as any).value
    );
  }
}
