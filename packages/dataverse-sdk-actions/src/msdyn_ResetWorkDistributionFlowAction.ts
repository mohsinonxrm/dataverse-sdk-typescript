import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_ResetWorkDistributionFlow action
 */
export interface msdyn_ResetWorkDistributionFlowResponse {
  // No content returned
}

/**
 * msdyn_ResetWorkDistributionFlow action
 *
 * Unbound action
 */
export class msdyn_ResetWorkDistributionFlowAction implements Executable<msdyn_ResetWorkDistributionFlowResponse> {
  constructor(public readonly shouldMaintainCustomizations: boolean) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ResetWorkDistributionFlow`;

    const body: Record<string, unknown> = {
      ShouldMaintainCustomizations: this.shouldMaintainCustomizations,
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

  async parseResponse(response: Response): Promise<msdyn_ResetWorkDistributionFlowResponse> {
    // No return value (204 No Content)
    return {};
  }
}
