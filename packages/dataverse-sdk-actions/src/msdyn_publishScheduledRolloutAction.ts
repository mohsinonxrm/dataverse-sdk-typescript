import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_publishScheduledRollout action
 */
export interface msdyn_publishScheduledRolloutResponse {
  // No content returned
}

/**
 * msdyn_publishScheduledRollout action
 *
 * Unbound action
 */
export class msdyn_publishScheduledRolloutAction implements Executable<msdyn_publishScheduledRolloutResponse> {
  constructor(public readonly rolloutPlanId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_publishScheduledRollout`;

    const body: Record<string, unknown> = {
      RolloutPlanId: this.rolloutPlanId,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_publishScheduledRolloutResponse> {
    // No return value (204 No Content)
    return {};
  }
}
