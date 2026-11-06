import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_WorkstreamShouldNotHaveEmptyRoutingRulesAboveRulesWithConditionRule action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_WorkstreamShouldNotHaveEmptyRoutingRulesAboveRulesWithConditionRuleResponse {
  "@odata.context"?: string;
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_WorkstreamShouldNotHaveEmptyRoutingRulesAboveRulesWithConditionRuleResponse;
  }
}
