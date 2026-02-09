import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdynmkt_retrievegdprconfiguration function
 */
export interface msdynmkt_retrievegdprconfigurationResponse {
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
    const data = await response.json();
    return data as msdynmkt_retrievegdprconfigurationResponse;
  }
}
