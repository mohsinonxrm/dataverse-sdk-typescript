import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_RetrievePlatformCopilotSettings action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_RetrievePlatformCopilotSettingsResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_RetrievePlatformCopilotSettingsResponse;
  }
}
