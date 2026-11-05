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
    const data = await response.json();
    return data as msdyn_WorkstreamCapacityShouldBeLessThanAgentsRuleResponse;
  }
}
