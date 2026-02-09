import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_ActivateRoutingRule action
 */
export interface msdyn_ActivateRoutingRuleResponse {
  // No content returned
}

/**
 * msdyn_ActivateRoutingRule action
 *
 * Unbound action
 */
export class msdyn_ActivateRoutingRuleAction implements Executable<msdyn_ActivateRoutingRuleResponse> {
  constructor(
    public readonly msdyn_ownerId: string,
    public readonly msdyn_routingRuleId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ActivateRoutingRule`;

    const body: Record<string, unknown> = {
      msdyn_ownerId: this.msdyn_ownerId,
      msdyn_routingRuleId: this.msdyn_routingRuleId,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_ActivateRoutingRuleResponse> {
    // No return value (204 No Content)
    return {};
  }
}
