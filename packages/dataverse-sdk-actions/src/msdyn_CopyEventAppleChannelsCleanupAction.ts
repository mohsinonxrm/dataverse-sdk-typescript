import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CopyEventAppleChannelsCleanup action
 */
export interface msdyn_CopyEventAppleChannelsCleanupResponse {
  // No content returned
}

/**
 * msdyn_CopyEventAppleChannelsCleanup action
 *
 * Unbound action
 */
export class msdyn_CopyEventAppleChannelsCleanupAction implements Executable<msdyn_CopyEventAppleChannelsCleanupResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CopyEventAppleChannelsCleanup`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CopyEventAppleChannelsCleanupResponse> {
    // No return value (204 No Content)
    return {};
  }
}
