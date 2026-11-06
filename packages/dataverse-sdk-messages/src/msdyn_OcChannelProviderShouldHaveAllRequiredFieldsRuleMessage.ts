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
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_OcChannelProviderShouldHaveAllRequiredFieldsRuleResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_OcChannelProviderShouldHaveAllRequiredFieldsRuleResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_OcChannelProviderShouldHaveAllRequiredFieldsRule action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_OcChannelProviderShouldHaveAllRequiredFieldsRuleResult {
  "@odata.context"?: string;
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
}

/**
 * msdyn_OcChannelProviderShouldHaveAllRequiredFieldsRule response message
 *
 * `result` is the value the msdyn_OcChannelProviderShouldHaveAllRequiredFieldsRule action returns (see {@link msdyn_OcChannelProviderShouldHaveAllRequiredFieldsRuleResult}).
 */
export class msdyn_OcChannelProviderShouldHaveAllRequiredFieldsRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_OcChannelProviderShouldHaveAllRequiredFieldsRuleResult) {
    super("msdyn_OcChannelProviderShouldHaveAllRequiredFieldsRule");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(
    data: unknown
  ): msdyn_OcChannelProviderShouldHaveAllRequiredFieldsRuleResponse {
    return new msdyn_OcChannelProviderShouldHaveAllRequiredFieldsRuleResponse(
      data as msdyn_OcChannelProviderShouldHaveAllRequiredFieldsRuleResult
    );
  }
}
