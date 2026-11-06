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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_CopyEventBotRegistrationsCleanupResponse;
    return (await response.json()) as msdyn_CopyEventBotRegistrationsCleanupResponse;
  }
}
