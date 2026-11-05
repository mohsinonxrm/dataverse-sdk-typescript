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
    // No return value (204 No Content)
    return {};
  }
}
