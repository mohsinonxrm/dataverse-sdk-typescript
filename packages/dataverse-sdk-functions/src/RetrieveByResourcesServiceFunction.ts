import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { resource, service } from "./types/index.js";

/**
 * Response from RetrieveByResourcesService function
 */
export interface RetrieveByResourcesServiceResponse {
  value: service[];
}

/**
 * Parameters of the RetrieveByResourcesService function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveByResourcesServiceFunctionParameters {
  Resource: resource[];
}

/**
 * RetrieveByResourcesService function
 *
 * Unbound function
 */
export class RetrieveByResourcesServiceFunction implements Executable<RetrieveByResourcesServiceResponse> {
  constructor(public readonly parameters: RetrieveByResourcesServiceFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveByResourcesService`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.Resource !== undefined) {
      aliases.push(`Resource=@p1`);
      params.append("@p1", JSON.stringify(this.parameters.Resource));
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as RetrieveByResourcesServiceResponse;
    return (await response.json()) as RetrieveByResourcesServiceResponse;
  }
}
