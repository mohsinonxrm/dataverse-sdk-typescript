import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdynmkt_DiscoverPlaceholders action
 */
export interface msdynmkt_DiscoverPlaceholdersResponse {
  DiscoverPlaceholdersResult: string;
}

/**
 * msdynmkt_DiscoverPlaceholders action
 *
 * Unbound action
 */
export class msdynmkt_DiscoverPlaceholdersAction implements Executable<msdynmkt_DiscoverPlaceholdersResponse> {
  constructor(public readonly discoverPlaceholdersRequest: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_DiscoverPlaceholders`;

    const body: Record<string, unknown> = {
      DiscoverPlaceholdersRequest: this.discoverPlaceholdersRequest,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdynmkt_DiscoverPlaceholdersResponse> {
    const data = await response.json();
    return data as msdynmkt_DiscoverPlaceholdersResponse;
  }
}
