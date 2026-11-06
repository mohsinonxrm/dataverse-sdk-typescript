import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_CopyEventFacebookChannelsCleanup action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_CopyEventFacebookChannelsCleanupResponse = void;

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

  parseResponse(_response: Response): Promise<msdyn_CopyEventFacebookChannelsCleanupResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
