import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { resource, service } from "./types/index.js";

/**
 * Response from RetrieveByResourcesService function
 */
export interface RetrieveByResourcesServiceResponse {
  value: service[];
}

/**
 * RetrieveByResourcesService function
 *
 * Unbound function
 */
export class RetrieveByResourcesServiceFunction implements Executable<RetrieveByResourcesServiceResponse> {
  constructor(public readonly resource: resource[]) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveByResourcesService`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.resource !== undefined) {
      aliases.push(`Resource=@p1`);
      params.append("@p1", JSON.stringify(this.resource));
    }
    if (aliases.length > 0) {
      url += `(${aliases.join(",")})?${params.toString()}`;
    }

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveByResourcesServiceResponse> {
    const data = await response.json();
    return data as RetrieveByResourcesServiceResponse;
  }
}
