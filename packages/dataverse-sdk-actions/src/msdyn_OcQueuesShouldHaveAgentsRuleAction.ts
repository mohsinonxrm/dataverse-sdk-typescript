import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_OcQueuesShouldHaveAgentsRule action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_OcQueuesShouldHaveAgentsRuleResponse {
  "@odata.context"?: string;
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_OcQueuesShouldHaveAgentsRuleResponse;
  }
}
