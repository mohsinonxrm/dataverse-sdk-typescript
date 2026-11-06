import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_WorkstreamShouldNotHaveEmptyRoutingRulesAboveRulesWithConditionRule action
 */
export interface msdyn_WorkstreamShouldNotHaveEmptyRoutingRulesAboveRulesWithConditionRuleResponse {
  ReturnStatus: number;
  Message: string;
  ResultEntities: string;
}

/**
 * msdyn_WorkstreamShouldNotHaveEmptyRoutingRulesAboveRulesWithConditionRule action
 *
 * Unbound action
 */
export class msdyn_WorkstreamShouldNotHaveEmptyRoutingRulesAboveRulesWithConditionRuleAction implements Executable<msdyn_WorkstreamShouldNotHaveEmptyRoutingRulesAboveRulesWithConditionRuleResponse> {
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
    return (
      text ? JSON.parse(text) : {}
    ) as msdyn_WorkstreamShouldNotHaveEmptyRoutingRulesAboveRulesWithConditionRuleResponse;
  }
}
