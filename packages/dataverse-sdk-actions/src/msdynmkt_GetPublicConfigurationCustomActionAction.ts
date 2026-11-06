import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdynmkt_GetPublicConfigurationCustomAction action
 */
export interface msdynmkt_GetPublicConfigurationCustomActionResponse {
  // No content returned
}

/**
 * msdynmkt_GetPublicConfigurationCustomAction action
 *
 * Unbound action
 */
export class msdynmkt_GetPublicConfigurationCustomActionAction implements Executable<msdynmkt_GetPublicConfigurationCustomActionResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_GetPublicConfigurationCustomAction`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdynmkt_GetPublicConfigurationCustomActionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdynmkt_GetPublicConfigurationCustomActionResponse;
    return (await response.json()) as msdynmkt_GetPublicConfigurationCustomActionResponse;
  }
}
