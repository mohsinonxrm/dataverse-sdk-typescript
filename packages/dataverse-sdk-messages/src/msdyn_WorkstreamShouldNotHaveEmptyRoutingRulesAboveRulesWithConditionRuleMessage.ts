import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_WorkstreamShouldNotHaveEmptyRoutingRulesAboveRulesWithConditionRuleResponse as msdyn_WorkstreamShouldNotHaveEmptyRoutingRulesAboveRulesWithConditionRuleResponseData } from "./types/index.js";

/**
 * msdyn_WorkstreamShouldNotHaveEmptyRoutingRulesAboveRulesWithConditionRule request message
 *
 * Web API Action: msdyn_WorkstreamShouldNotHaveEmptyRoutingRulesAboveRulesWithConditionRule
 */
export class msdyn_WorkstreamShouldNotHaveEmptyRoutingRulesAboveRulesWithConditionRuleRequest
  extends OrganizationRequest
  implements
    Executable<msdyn_WorkstreamShouldNotHaveEmptyRoutingRulesAboveRulesWithConditionRuleResponse>
{
  constructor() {
    super("msdyn_WorkstreamShouldNotHaveEmptyRoutingRulesAboveRulesWithConditionRule");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_WorkstreamShouldNotHaveEmptyRoutingRulesAboveRulesWithConditionRule`;

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
  ): Promise<msdyn_WorkstreamShouldNotHaveEmptyRoutingRulesAboveRulesWithConditionRuleResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_WorkstreamShouldNotHaveEmptyRoutingRulesAboveRulesWithConditionRuleResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
  }
}

/**
 * msdyn_WorkstreamShouldNotHaveEmptyRoutingRulesAboveRulesWithConditionRule response message
 */
export class msdyn_WorkstreamShouldNotHaveEmptyRoutingRulesAboveRulesWithConditionRuleResponse extends OrganizationResponse {
  constructor(
    public result: msdyn_WorkstreamShouldNotHaveEmptyRoutingRulesAboveRulesWithConditionRuleResponseData
  ) {
    super("msdyn_WorkstreamShouldNotHaveEmptyRoutingRulesAboveRulesWithConditionRule");
  }

  static fromResponse(
    data: unknown
  ): msdyn_WorkstreamShouldNotHaveEmptyRoutingRulesAboveRulesWithConditionRuleResponse {
    return new msdyn_WorkstreamShouldNotHaveEmptyRoutingRulesAboveRulesWithConditionRuleResponse(
      responseObject<msdyn_WorkstreamShouldNotHaveEmptyRoutingRulesAboveRulesWithConditionRuleResponseData>(
        data
      )
    );
  }
}
