import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { queue } from "./types/index.js";

/**
 * Response from the RetrieveUserQueues function.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type RetrieveUserQueuesResponse = Array<
  queue & { "@odata.etag"?: string; "@odata.type"?: string }
>;

/**
 * Parameters of the RetrieveUserQueues function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveUserQueuesFunctionParameters {
  IncludePublic: boolean;
}

/**
 * RetrieveUserQueues function
 *
 * Bound function
 * Binding parameter: entity (mscrm.systemuser)
 *
 * The first argument is the id of the systemuser record to call it on.
 */
export class RetrieveUserQueuesFunction implements Executable<RetrieveUserQueuesResponse> {
  constructor(
    public readonly systemuserId: string,
    public readonly parameters: RetrieveUserQueuesFunctionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/systemusers(${odataLiteral.guid(this.systemuserId)})/Microsoft.Dynamics.CRM.RetrieveUserQueues`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.IncludePublic !== undefined) {
      aliases.push(`IncludePublic=@p1`);
      params.append("@p1", formatParameterAlias(this.parameters.IncludePublic, "Edm.Boolean"));
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

  async parseResponse(response: Response): Promise<RetrieveUserQueuesResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204) return [];
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return ((await response.json()) as { value: RetrieveUserQueuesResponse }).value;
  }
}
