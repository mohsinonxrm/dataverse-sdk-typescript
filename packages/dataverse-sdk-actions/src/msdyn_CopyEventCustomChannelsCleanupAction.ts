import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CopyEventCustomChannelsCleanup action
 */
export interface msdyn_CopyEventCustomChannelsCleanupResponse {
  // No content returned
}

/**
 * msdyn_CopyEventCustomChannelsCleanup action
 *
 * Unbound action
 */
export class msdyn_CopyEventCustomChannelsCleanupAction implements Executable<msdyn_CopyEventCustomChannelsCleanupResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CopyEventCustomChannelsCleanup`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CopyEventCustomChannelsCleanupResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_CopyEventCustomChannelsCleanupResponse;
    return (await response.json()) as msdyn_CopyEventCustomChannelsCleanupResponse;
  }
}
