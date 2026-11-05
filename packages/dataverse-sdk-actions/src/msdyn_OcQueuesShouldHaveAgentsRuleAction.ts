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
    const data = await response.json();
    return data as msdyn_OcQueuesShouldHaveAgentsRuleResponse;
  }
}
