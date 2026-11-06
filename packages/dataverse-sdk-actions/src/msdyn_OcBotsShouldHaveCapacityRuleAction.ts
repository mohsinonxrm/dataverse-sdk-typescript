import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_OcBotsShouldHaveCapacityRule action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_OcBotsShouldHaveCapacityRuleResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_OcBotsShouldHaveCapacityRuleResponse;
  }
}
