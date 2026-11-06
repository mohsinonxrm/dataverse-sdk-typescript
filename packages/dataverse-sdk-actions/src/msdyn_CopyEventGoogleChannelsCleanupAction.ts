import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_CopyEventGoogleChannelsCleanup action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_CopyEventGoogleChannelsCleanupResponse = void;

/**
 * msdyn_CopyEventGoogleChannelsCleanup action
 *
 * Unbound action
 */
export class msdyn_CopyEventGoogleChannelsCleanupAction implements Executable<msdyn_CopyEventGoogleChannelsCleanupResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CopyEventGoogleChannelsCleanup`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  parseResponse(_response: Response): Promise<msdyn_CopyEventGoogleChannelsCleanupResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
