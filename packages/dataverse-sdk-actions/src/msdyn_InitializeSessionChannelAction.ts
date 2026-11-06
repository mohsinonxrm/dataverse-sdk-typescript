import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_InitializeSessionChannel action
 */
export interface msdyn_InitializeSessionChannelResponse {
  // No content returned
}

/**
 * msdyn_InitializeSessionChannel action
 *
 * Unbound action
 */
export class msdyn_InitializeSessionChannelAction implements Executable<msdyn_InitializeSessionChannelResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_InitializeSessionChannel`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_InitializeSessionChannelResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_InitializeSessionChannelResponse;
    return (await response.json()) as msdyn_InitializeSessionChannelResponse;
  }
}
