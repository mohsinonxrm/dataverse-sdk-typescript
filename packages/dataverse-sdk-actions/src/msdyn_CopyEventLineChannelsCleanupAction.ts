import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CopyEventLineChannelsCleanup action
 */
export interface msdyn_CopyEventLineChannelsCleanupResponse {
  // No content returned
}

/**
 * msdyn_CopyEventLineChannelsCleanup action
 *
 * Unbound action
 */
export class msdyn_CopyEventLineChannelsCleanupAction implements Executable<msdyn_CopyEventLineChannelsCleanupResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CopyEventLineChannelsCleanup`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CopyEventLineChannelsCleanupResponse> {
    // No return value (204 No Content)
    return {};
  }
}
