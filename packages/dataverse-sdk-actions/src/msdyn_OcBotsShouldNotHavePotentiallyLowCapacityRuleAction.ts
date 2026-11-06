import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_OcBotsShouldNotHavePotentiallyLowCapacityRule action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_OcBotsShouldNotHavePotentiallyLowCapacityRuleResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_OcBotsShouldNotHavePotentiallyLowCapacityRuleResponse;
  }
}
