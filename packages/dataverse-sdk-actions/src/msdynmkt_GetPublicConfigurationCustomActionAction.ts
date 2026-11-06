import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdynmkt_GetPublicConfigurationCustomAction action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdynmkt_GetPublicConfigurationCustomActionResponse = void;

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

  parseResponse(_response: Response): Promise<msdynmkt_GetPublicConfigurationCustomActionResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
