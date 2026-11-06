import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_OcQueuesShouldHaveAgentsRule action
 */
export interface msdyn_OcQueuesShouldHaveAgentsRuleResponse {
  ReturnStatus: number;
  Message: string;
  ResultEntities: string;
}

/**
 * msdyn_OcQueuesShouldHaveAgentsRule action
 *
 * Unbound action
 */
export class msdyn_OcQueuesShouldHaveAgentsRuleAction implements Executable<msdyn_OcQueuesShouldHaveAgentsRuleResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_OcQueuesShouldHaveAgentsRule`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_OcQueuesShouldHaveAgentsRuleResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_OcQueuesShouldHaveAgentsRuleResponse;
    return (await response.json()) as msdyn_OcQueuesShouldHaveAgentsRuleResponse;
  }
}
