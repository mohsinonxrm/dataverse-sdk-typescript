import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_OcBotsShouldNotHavePotentiallyLowCapacityRule action
 */
export interface msdyn_OcBotsShouldNotHavePotentiallyLowCapacityRuleResponse {
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
}

/**
 * msdyn_OcBotsShouldNotHavePotentiallyLowCapacityRule action
 *
 * Unbound action
 */
export class msdyn_OcBotsShouldNotHavePotentiallyLowCapacityRuleAction implements Executable<msdyn_OcBotsShouldNotHavePotentiallyLowCapacityRuleResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_OcBotsShouldNotHavePotentiallyLowCapacityRule`;

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
  ): Promise<msdyn_OcBotsShouldNotHavePotentiallyLowCapacityRuleResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return {} as msdyn_OcBotsShouldNotHavePotentiallyLowCapacityRuleResponse;
    return (await response.json()) as msdyn_OcBotsShouldNotHavePotentiallyLowCapacityRuleResponse;
  }
}
