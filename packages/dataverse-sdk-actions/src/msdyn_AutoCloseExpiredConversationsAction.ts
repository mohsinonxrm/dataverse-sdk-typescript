import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_AutoCloseExpiredConversations action
 */
export interface msdyn_AutoCloseExpiredConversationsResponse {
  // No content returned
}

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

  async parseResponse(response: Response): Promise<msdyn_AutoCloseExpiredConversationsResponse> {
    // No return value (204 No Content)
    return {};
  }
}
