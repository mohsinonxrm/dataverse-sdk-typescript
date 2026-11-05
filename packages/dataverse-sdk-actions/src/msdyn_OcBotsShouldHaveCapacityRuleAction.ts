import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_OcBotsShouldHaveCapacityRule action
 */
export interface msdyn_OcBotsShouldHaveCapacityRuleResponse {
  ReturnStatus: number;
  ResultEntities: string;
  Message: string;
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
    const data = await response.json();
    return data as msdyn_OcBotsShouldHaveCapacityRuleResponse;
  }
}
