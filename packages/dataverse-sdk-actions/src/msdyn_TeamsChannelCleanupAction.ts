import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_TeamsChannelCleanup action
 */
export interface msdyn_TeamsChannelCleanupResponse {
  // No content returned
}

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

  async parseResponse(response: Response): Promise<msdyn_TeamsChannelCleanupResponse> {
    // No return value (204 No Content)
    return {};
  }
}
