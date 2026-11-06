import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CopyEventWhatsAppChannelCleanup action
 */
export interface msdyn_CopyEventWhatsAppChannelCleanupResponse {
  // No content returned
}

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

  async parseResponse(response: Response): Promise<msdyn_CopyEventWhatsAppChannelCleanupResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_CopyEventWhatsAppChannelCleanupResponse;
    return (await response.json()) as msdyn_CopyEventWhatsAppChannelCleanupResponse;
  }
}
