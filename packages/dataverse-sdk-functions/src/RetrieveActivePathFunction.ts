import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { processstage } from "./types/index.js";

/**
 * Response from the RetrieveActivePath function.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type RetrieveActivePathResponse = Array<
  processstage & { "@odata.etag"?: string; "@odata.type"?: string }
>;

/**
 * Parameters of the RetrieveActivePath function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveActivePathFunctionParameters {
  ProcessInstanceId: string;
}

/**
 * RetrieveActivePath function
 *
 * Unbound function
 */
export class RetrieveActivePathFunction implements Executable<RetrieveActivePathResponse> {
  constructor(public readonly parameters: RetrieveActivePathFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveActivePath`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.ProcessInstanceId !== undefined) {
      aliases.push(`ProcessInstanceId=@p1`);
      params.append("@p1", formatParameterAlias(this.parameters.ProcessInstanceId, "Edm.Guid"));
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

  async parseResponse(response: Response): Promise<RetrieveActivePathResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204) return [];
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return ((await response.json()) as { value: RetrieveActivePathResponse }).value;
  }
}
