import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_OcBotsShouldNotHavePotentiallyLowCapacityRule action
 */
export interface msdyn_OcBotsShouldNotHavePotentiallyLowCapacityRuleResponse {
  ReturnStatus: number;
  ResultEntities: string;
  Message: string;
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (
      text ? JSON.parse(text) : {}
    ) as msdyn_OcBotsShouldNotHavePotentiallyLowCapacityRuleResponse;
  }
}
