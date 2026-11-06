import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_OcAgentsShouldHaveCapacityRule action
 */
export interface msdyn_OcAgentsShouldHaveCapacityRuleResponse {
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
}

/**
 * msdyn_OcAgentsShouldHaveCapacityRule action
 *
 * Unbound action
 */
export class msdyn_OcAgentsShouldHaveCapacityRuleAction implements Executable<msdyn_OcAgentsShouldHaveCapacityRuleResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_OcAgentsShouldHaveCapacityRule`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_OcAgentsShouldHaveCapacityRuleResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_OcAgentsShouldHaveCapacityRuleResponse;
    return (await response.json()) as msdyn_OcAgentsShouldHaveCapacityRuleResponse;
  }
}
