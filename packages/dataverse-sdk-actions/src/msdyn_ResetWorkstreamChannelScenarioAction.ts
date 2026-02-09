import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_ResetWorkstreamChannelScenario action
 */
export interface msdyn_ResetWorkstreamChannelScenarioResponse {
  // No content returned
}

/**
 * msdyn_ResetWorkstreamChannelScenario action
 *
 * Unbound action
 */
export class msdyn_ResetWorkstreamChannelScenarioAction implements Executable<msdyn_ResetWorkstreamChannelScenarioResponse> {
  constructor(public readonly liveWorkStreamId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ResetWorkstreamChannelScenario`;

    const body: Record<string, unknown> = {
      LiveWorkStreamId: this.liveWorkStreamId,
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

  async parseResponse(response: Response): Promise<msdyn_ResetWorkstreamChannelScenarioResponse> {
    // No return value (204 No Content)
    return {};
  }
}
