import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_FacebookPageConfigurationShouldHaveWorkStreamRuleResponse as msdyn_FacebookPageConfigurationShouldHaveWorkStreamRuleResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_FacebookPageConfigurationShouldHaveWorkStreamRuleResponse.fromResponse({});
    return msdyn_FacebookPageConfigurationShouldHaveWorkStreamRuleResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * msdyn_FacebookPageConfigurationShouldHaveWorkStreamRule response message
 */
export class msdyn_FacebookPageConfigurationShouldHaveWorkStreamRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_FacebookPageConfigurationShouldHaveWorkStreamRuleResponseData) {
    super("msdyn_FacebookPageConfigurationShouldHaveWorkStreamRule");
  }

  static fromResponse(
    data: unknown
  ): msdyn_FacebookPageConfigurationShouldHaveWorkStreamRuleResponse {
    return new msdyn_FacebookPageConfigurationShouldHaveWorkStreamRuleResponse(
      responseObject<msdyn_FacebookPageConfigurationShouldHaveWorkStreamRuleResponseData>(data)
    );
  }
}
