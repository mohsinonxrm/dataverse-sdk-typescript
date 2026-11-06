import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CopyEventFacebookChannelsCleanup action
 */
export interface msdyn_CopyEventFacebookChannelsCleanupResponse {
  // No content returned
}

/**
 * msdyn_CopyEventFacebookChannelsCleanup action
 *
 * Unbound action
 */
export class msdyn_CopyEventFacebookChannelsCleanupAction implements Executable<msdyn_CopyEventFacebookChannelsCleanupResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CopyEventFacebookChannelsCleanup`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CopyEventFacebookChannelsCleanupResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_CopyEventFacebookChannelsCleanupResponse;
  }
}
