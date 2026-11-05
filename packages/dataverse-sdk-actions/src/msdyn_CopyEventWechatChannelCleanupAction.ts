import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CopyEventWechatChannelCleanup action
 */
export interface msdyn_CopyEventWechatChannelCleanupResponse {
  // No content returned
}

/**
 * msdyn_CopyEventWechatChannelCleanup action
 *
 * Unbound action
 */
export class msdyn_CopyEventWechatChannelCleanupAction implements Executable<msdyn_CopyEventWechatChannelCleanupResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CopyEventWechatChannelCleanup`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CopyEventWechatChannelCleanupResponse> {
    // No return value (204 No Content)
    return {};
  }
}
