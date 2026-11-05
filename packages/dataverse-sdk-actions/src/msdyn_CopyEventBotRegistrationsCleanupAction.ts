import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CopyEventBotRegistrationsCleanup action
 */
export interface msdyn_CopyEventBotRegistrationsCleanupResponse {
  // No content returned
}

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

  async parseResponse(response: Response): Promise<msdyn_CopyEventBotRegistrationsCleanupResponse> {
    // No return value (204 No Content)
    return {};
  }
}
