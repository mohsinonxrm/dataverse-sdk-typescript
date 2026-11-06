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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_TeamsChannelCleanupResponse;
  }
}
