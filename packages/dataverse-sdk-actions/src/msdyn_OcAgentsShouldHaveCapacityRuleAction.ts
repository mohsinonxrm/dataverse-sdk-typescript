import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_OcAgentsShouldHaveCapacityRule action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_OcAgentsShouldHaveCapacityRuleResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_OcAgentsShouldHaveCapacityRuleResponse;
  }
}
