import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_GetEnabledChannels action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetEnabledChannelsResponse {
  "@odata.context"?: string;
  enabledChannels: string;
}

/**
 * msdyn_GetEnabledChannels action
 *
 * Unbound action
 */
export class msdyn_GetEnabledChannelsAction implements Executable<msdyn_GetEnabledChannelsResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetEnabledChannels`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetEnabledChannelsResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetEnabledChannelsResponse;
  }
}
