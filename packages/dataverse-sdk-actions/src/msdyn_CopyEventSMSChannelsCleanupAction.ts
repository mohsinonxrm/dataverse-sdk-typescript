import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CopyEventSMSChannelsCleanup action
 */
export interface msdyn_CopyEventSMSChannelsCleanupResponse {
  // No content returned
}

/**
 * msdyn_CopyEventSMSChannelsCleanup action
 *
 * Unbound action
 */
export class msdyn_CopyEventSMSChannelsCleanupAction implements Executable<msdyn_CopyEventSMSChannelsCleanupResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CopyEventSMSChannelsCleanup`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CopyEventSMSChannelsCleanupResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_CopyEventSMSChannelsCleanupResponse;
  }
}
