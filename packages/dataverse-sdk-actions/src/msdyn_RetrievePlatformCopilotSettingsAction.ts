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
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_RetrievePlatformCopilotSettingsResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_RetrievePlatformCopilotSettingsResponse;
  }
}
