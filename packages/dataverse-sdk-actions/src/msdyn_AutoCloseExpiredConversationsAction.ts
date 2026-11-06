import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_AutoCloseExpiredConversations action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_AutoCloseExpiredConversationsResponse = void;

/**
 * msdyn_AutoCloseExpiredConversations action
 *
 * Unbound action
 */
export class msdyn_AutoCloseExpiredConversationsAction implements Executable<msdyn_AutoCloseExpiredConversationsResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AutoCloseExpiredConversations`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  parseResponse(_response: Response): Promise<msdyn_AutoCloseExpiredConversationsResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
