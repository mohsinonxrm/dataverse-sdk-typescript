import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_CopyEventBotRegistrationsCleanup action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_CopyEventBotRegistrationsCleanupResponse = void;

/**
 * msdyn_CopyEventBotRegistrationsCleanup action
 *
 * Unbound action
 */
export class msdyn_CopyEventBotRegistrationsCleanupAction implements Executable<msdyn_CopyEventBotRegistrationsCleanupResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CopyEventBotRegistrationsCleanup`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  parseResponse(_response: Response): Promise<msdyn_CopyEventBotRegistrationsCleanupResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
