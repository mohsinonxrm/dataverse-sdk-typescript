import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_OcBotsShouldHaveCapacityRule action
 */
export interface msdyn_OcBotsShouldHaveCapacityRuleResponse {
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
}

/**
 * msdyn_OcBotsShouldHaveCapacityRule action
 *
 * Unbound action
 */
export class msdyn_OcBotsShouldHaveCapacityRuleAction implements Executable<msdyn_OcBotsShouldHaveCapacityRuleResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_OcBotsShouldHaveCapacityRule`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_OcBotsShouldHaveCapacityRuleResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_OcBotsShouldHaveCapacityRuleResponse;
    return (await response.json()) as msdyn_OcBotsShouldHaveCapacityRuleResponse;
  }
}
