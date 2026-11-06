import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_WorkstreamCapacityShouldBeLessThanAgentsRule action
 */
export interface msdyn_WorkstreamCapacityShouldBeLessThanAgentsRuleResponse {
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
    // 204 No Content is an empty result
    if (response.status === 204)
      return {} as msdyn_WorkstreamCapacityShouldBeLessThanAgentsRuleResponse;
    return (await response.json()) as msdyn_WorkstreamCapacityShouldBeLessThanAgentsRuleResponse;
  }
}
