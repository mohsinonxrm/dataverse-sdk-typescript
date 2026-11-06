import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_WorkstreamCapacityShouldBeLessThanAgentsRule action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_WorkstreamCapacityShouldBeLessThanAgentsRuleResponse {
  "@odata.context"?: string;
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
}

/**
 * msdyn_WorkstreamCapacityShouldBeLessThanAgentsRule action
 *
 * Unbound action
 */
export class msdyn_WorkstreamCapacityShouldBeLessThanAgentsRuleAction implements Executable<msdyn_WorkstreamCapacityShouldBeLessThanAgentsRuleResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_WorkstreamCapacityShouldBeLessThanAgentsRule`;

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
  ): Promise<msdyn_WorkstreamCapacityShouldBeLessThanAgentsRuleResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_WorkstreamCapacityShouldBeLessThanAgentsRuleResponse;
  }
}
