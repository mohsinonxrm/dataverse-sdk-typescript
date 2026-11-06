import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CopyEventVoiceChannelsCleanup action
 */
export interface msdyn_CopyEventVoiceChannelsCleanupResponse {
  // No content returned
}

/**
 * msdyn_CopyEventVoiceChannelsCleanup action
 *
 * Unbound action
 */
export class msdyn_CopyEventVoiceChannelsCleanupAction implements Executable<msdyn_CopyEventVoiceChannelsCleanupResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CopyEventVoiceChannelsCleanup`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CopyEventVoiceChannelsCleanupResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_CopyEventVoiceChannelsCleanupResponse;
    return (await response.json()) as msdyn_CopyEventVoiceChannelsCleanupResponse;
  }
}
