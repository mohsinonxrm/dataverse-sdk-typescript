import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CopyEventTwitterChannelsCleanup action
 */
export interface msdyn_CopyEventTwitterChannelsCleanupResponse {
  // No content returned
}

/**
 * msdyn_CopyEventTwitterChannelsCleanup action
 *
 * Unbound action
 */
export class msdyn_CopyEventTwitterChannelsCleanupAction implements Executable<msdyn_CopyEventTwitterChannelsCleanupResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CopyEventTwitterChannelsCleanup`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CopyEventTwitterChannelsCleanupResponse> {
    // No return value (204 No Content)
    return {};
  }
}
