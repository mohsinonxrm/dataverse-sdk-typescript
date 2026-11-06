import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdynmkt_retrievegdprconfiguration function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdynmkt_retrievegdprconfigurationResponse {
  "@odata.context"?: string;
  msdynmkt_retrievegdprconfigurationresponse: string;
}

/**
 * msdynmkt_retrievegdprconfiguration function
 *
 * Unbound function
 */
export class msdynmkt_retrievegdprconfigurationFunction implements Executable<msdynmkt_retrievegdprconfigurationResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/msdynmkt_retrievegdprconfiguration`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdynmkt_retrievegdprconfigurationResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdynmkt_retrievegdprconfigurationResponse;
  }
}
