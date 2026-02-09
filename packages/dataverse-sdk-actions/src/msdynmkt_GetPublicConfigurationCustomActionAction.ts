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
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdynmkt_GetPublicConfigurationCustomActionResponse> {
    // No return value (204 No Content)
    return {};
  }
}
