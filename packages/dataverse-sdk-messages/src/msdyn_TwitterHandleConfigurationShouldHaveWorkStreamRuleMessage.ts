import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_TwitterHandleConfigurationShouldHaveWorkStreamRuleResponse as msdyn_TwitterHandleConfigurationShouldHaveWorkStreamRuleResponseData } from "./types/index.js";

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
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_TwitterHandleConfigurationShouldHaveWorkStreamRuleResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_TwitterHandleConfigurationShouldHaveWorkStreamRuleResponse.fromResponse({});
    return msdyn_TwitterHandleConfigurationShouldHaveWorkStreamRuleResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * msdyn_TwitterHandleConfigurationShouldHaveWorkStreamRule response message
 */
export class msdyn_TwitterHandleConfigurationShouldHaveWorkStreamRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_TwitterHandleConfigurationShouldHaveWorkStreamRuleResponseData) {
    super("msdyn_TwitterHandleConfigurationShouldHaveWorkStreamRule");
  }

  static fromResponse(
    data: unknown
  ): msdyn_TwitterHandleConfigurationShouldHaveWorkStreamRuleResponse {
    return new msdyn_TwitterHandleConfigurationShouldHaveWorkStreamRuleResponse(
      responseObject<msdyn_TwitterHandleConfigurationShouldHaveWorkStreamRuleResponseData>(data)
    );
  }
}
