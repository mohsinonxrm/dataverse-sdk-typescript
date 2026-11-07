import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import type { team } from "./types/index.js";

/**
 * Response from the RetrieveSharedLinks function.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type RetrieveSharedLinksResponse = Array<
  team & { "@odata.etag"?: string; "@odata.type"?: string }
>;

/**
 * Parameters of the RetrieveSharedLinks function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveSharedLinksFunctionParameters {
  Target: EntityReference;
}

/**
 * RetrieveSharedLinks function
 *
 * Unbound function
 */
export class RetrieveSharedLinksFunction implements Executable<RetrieveSharedLinksResponse> {
  constructor(public readonly parameters: RetrieveSharedLinksFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveSharedLinks`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.Target !== undefined) {
      aliases.push(`Target=@p1`);
      params.append(
        "@p1",
        formatParameterAlias(this.parameters.Target, "mscrm.crmbaseentity", "EntityType")
      );
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

  async parseResponse(response: Response): Promise<RetrieveSharedLinksResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204) return [];
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return ((await response.json()) as { value: RetrieveSharedLinksResponse }).value;
  }
}
