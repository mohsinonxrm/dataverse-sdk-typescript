import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdynmkt_DiscoverPlaceholders action
 */
export interface msdynmkt_DiscoverPlaceholdersResponse {
  DiscoverPlaceholdersResult: string;
}

/**
 * Parameters of the msdynmkt_DiscoverPlaceholders action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_DiscoverPlaceholdersActionParameters {
  DiscoverPlaceholdersRequest?: string;
}

/**
 * msdynmkt_DiscoverPlaceholders action
 *
 * Unbound action
 */
export class msdynmkt_DiscoverPlaceholdersAction implements Executable<msdynmkt_DiscoverPlaceholdersResponse> {
  constructor(public readonly parameters: msdynmkt_DiscoverPlaceholdersActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_DiscoverPlaceholders`;

    const body = requestBody({
      DiscoverPlaceholdersRequest: this.parameters.DiscoverPlaceholdersRequest,
    });

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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdynmkt_DiscoverPlaceholdersResponse;
    return (await response.json()) as msdynmkt_DiscoverPlaceholdersResponse;
  }
}
