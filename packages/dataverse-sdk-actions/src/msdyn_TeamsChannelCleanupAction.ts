import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_TeamsChannelCleanup action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_TeamsChannelCleanupResponse = void;

/**
 * msdyn_TeamsChannelCleanup action
 *
 * Unbound action
 */
export class msdyn_TeamsChannelCleanupAction implements Executable<msdyn_TeamsChannelCleanupResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TeamsChannelCleanup`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  parseResponse(_response: Response): Promise<msdyn_TeamsChannelCleanupResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
