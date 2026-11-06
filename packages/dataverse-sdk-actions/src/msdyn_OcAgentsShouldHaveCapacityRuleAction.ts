import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_OcAgentsShouldHaveCapacityRule action
 */
export interface msdyn_OcAgentsShouldHaveCapacityRuleResponse {
  ReturnStatus: number;
  Message: string;
  ResultEntities: string;
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_OcAgentsShouldHaveCapacityRuleResponse;
  }
}
