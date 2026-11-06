import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_WorkstreamCapacityShouldBeLessThanAgentsRule action
 */
export interface msdyn_WorkstreamCapacityShouldBeLessThanAgentsRuleResponse {
  ReturnStatus: number;
  Message: string;
  ResultEntities: string;
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (
      text ? JSON.parse(text) : {}
    ) as msdyn_WorkstreamCapacityShouldBeLessThanAgentsRuleResponse;
  }
}
