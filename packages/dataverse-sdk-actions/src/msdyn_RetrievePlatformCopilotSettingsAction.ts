import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_RetrievePlatformCopilotSettings action
 */
export interface msdyn_RetrievePlatformCopilotSettingsResponse {
  Result: string;
}

/**
 * msdyn_RetrievePlatformCopilotSettings action
 *
 * Unbound action
 */
export class msdyn_RetrievePlatformCopilotSettingsAction implements Executable<msdyn_RetrievePlatformCopilotSettingsResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrievePlatformCopilotSettings`;

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_RetrievePlatformCopilotSettingsResponse> {
    const data = await response.json();
    return data as msdyn_RetrievePlatformCopilotSettingsResponse;
  }
}
