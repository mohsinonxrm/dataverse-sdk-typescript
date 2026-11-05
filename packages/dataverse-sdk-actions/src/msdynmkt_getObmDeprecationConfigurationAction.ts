import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdynmkt_getObmDeprecationConfiguration action
 */
export interface msdynmkt_getObmDeprecationConfigurationResponse {
  msdynmkt_obmDeprecationConfiguration: string;
}

/**
 * msdynmkt_getObmDeprecationConfiguration action
 *
 * Unbound action
 */
export class msdynmkt_getObmDeprecationConfigurationAction implements Executable<msdynmkt_getObmDeprecationConfigurationResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_getObmDeprecationConfiguration`;

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
  ): Promise<msdynmkt_getObmDeprecationConfigurationResponse> {
    const data = await response.json();
    return data as msdynmkt_getObmDeprecationConfigurationResponse;
  }
}
