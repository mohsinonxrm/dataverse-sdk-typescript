import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CopyEventGoogleChannelsCleanup action
 */
export interface msdyn_CopyEventGoogleChannelsCleanupResponse {
  // No content returned
}

/**
 * msdyn_CopyEventGoogleChannelsCleanup action
 *
 * Unbound action
 */
export class msdyn_CopyEventGoogleChannelsCleanupAction implements Executable<msdyn_CopyEventGoogleChannelsCleanupResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CopyEventGoogleChannelsCleanup`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CopyEventGoogleChannelsCleanupResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_CopyEventGoogleChannelsCleanupResponse;
    return (await response.json()) as msdyn_CopyEventGoogleChannelsCleanupResponse;
  }
}
