import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_CopyEventLineChannelsCleanup action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_CopyEventLineChannelsCleanupResponse = void;

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

  parseResponse(_response: Response): Promise<msdyn_CopyEventLineChannelsCleanupResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
