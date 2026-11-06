import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_CopyEventWhatsAppChannelCleanup action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_CopyEventWhatsAppChannelCleanupResponse = void;

/**
 * msdyn_CopyEventWhatsAppChannelCleanup action
 *
 * Unbound action
 */
export class msdyn_CopyEventWhatsAppChannelCleanupAction implements Executable<msdyn_CopyEventWhatsAppChannelCleanupResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CopyEventWhatsAppChannelCleanup`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  parseResponse(_response: Response): Promise<msdyn_CopyEventWhatsAppChannelCleanupResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
