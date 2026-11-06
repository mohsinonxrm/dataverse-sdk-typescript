import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetEnabledChannels action
 */
export interface msdyn_GetEnabledChannelsResponse {
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GetEnabledChannelsResponse;
    return (await response.json()) as msdyn_GetEnabledChannelsResponse;
  }
}
