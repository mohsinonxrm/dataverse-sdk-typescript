import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GBMConfigurationShouldHaveWorkStreamRuleResponse as msdyn_GBMConfigurationShouldHaveWorkStreamRuleResponseData } from "./types/index.js";

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
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_GBMConfigurationShouldHaveWorkStreamRuleResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_GBMConfigurationShouldHaveWorkStreamRuleResponse.fromResponse({});
    return msdyn_GBMConfigurationShouldHaveWorkStreamRuleResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * msdyn_GBMConfigurationShouldHaveWorkStreamRule response message
 */
export class msdyn_GBMConfigurationShouldHaveWorkStreamRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_GBMConfigurationShouldHaveWorkStreamRuleResponseData) {
    super("msdyn_GBMConfigurationShouldHaveWorkStreamRule");
  }

  static fromResponse(data: unknown): msdyn_GBMConfigurationShouldHaveWorkStreamRuleResponse {
    return new msdyn_GBMConfigurationShouldHaveWorkStreamRuleResponse(
      responseObject<msdyn_GBMConfigurationShouldHaveWorkStreamRuleResponseData>(data)
    );
  }
}
