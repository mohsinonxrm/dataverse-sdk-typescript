import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_UpdateCopilotSettings action
 */
export interface msdyn_UpdateCopilotSettingsResponse {
  // No content returned
}

/**
 * msdyn_UpdateCopilotSettings action
 *
 * Unbound action
 */
export class msdyn_UpdateCopilotSettingsAction implements Executable<msdyn_UpdateCopilotSettingsResponse> {
  constructor(public readonly msdyn_input: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateCopilotSettings`;

    const body: Record<string, unknown> = {
      msdyn_input: this.msdyn_input,
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

  async parseResponse(response: Response): Promise<msdyn_UpdateCopilotSettingsResponse> {
    // No return value (204 No Content)
    return {};
  }
}
