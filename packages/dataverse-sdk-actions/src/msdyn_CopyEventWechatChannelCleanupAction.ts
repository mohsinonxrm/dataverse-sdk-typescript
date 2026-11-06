import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_CopyEventWechatChannelCleanup action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_CopyEventWechatChannelCleanupResponse = void;

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

  parseResponse(_response: Response): Promise<msdyn_CopyEventWechatChannelCleanupResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
