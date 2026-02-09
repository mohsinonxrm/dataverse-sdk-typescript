import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CopyEventSMSChannelsCleanup action
 */
export interface msdyn_CopyEventSMSChannelsCleanupResponse {
  // No content returned
}

/**
 * msdyn_CopyEventSMSChannelsCleanup action
 *
 * Unbound action
 */
export class msdyn_CopyEventSMSChannelsCleanupAction implements Executable<msdyn_CopyEventSMSChannelsCleanupResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CopyEventSMSChannelsCleanup`;

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CopyEventSMSChannelsCleanupResponse> {
    // No return value (204 No Content)
    return {};
  }
}
