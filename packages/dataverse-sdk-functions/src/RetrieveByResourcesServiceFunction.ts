import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { resource, service } from "./types/index.js";

/**
 * Response from the RetrieveByResourcesService function.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type RetrieveByResourcesServiceResponse = Array<
  service & { "@odata.etag"?: string; "@odata.type"?: string }
>;

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
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204) return [];
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return ((await response.json()) as { value: RetrieveByResourcesServiceResponse }).value;
  }
}
