import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdynmkt_getObmDeprecationConfiguration action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdynmkt_getObmDeprecationConfigurationResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdynmkt_getObmDeprecationConfigurationResponse;
  }
}
