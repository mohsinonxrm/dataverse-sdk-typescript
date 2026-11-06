import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { EntityReference } from "./types/EntityReference.js";
import type { PagingInfo } from "./types/index.js";

/**
 * Response from the RetrieveDuplicates function.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type RetrieveDuplicatesResponse = Array<{
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
}>;

/**
 * Parameters of the RetrieveDuplicates function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveDuplicatesFunctionParameters {
  BusinessEntity: EntityReference;
  MatchingEntityName: string;
  PagingInfo?: PagingInfo;
}

/**
 * RetrieveDuplicates function
 *
 * Unbound function
 */
export class RetrieveDuplicatesFunction implements Executable<RetrieveDuplicatesResponse> {
  constructor(public readonly parameters: RetrieveDuplicatesFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveDuplicates`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.BusinessEntity !== undefined) {
      aliases.push(`BusinessEntity=@p1`);
      params.append(
        "@p1",
        formatParameterAlias(this.parameters.BusinessEntity, "mscrm.crmbaseentity", "EntityType")
      );
    }
    if (this.parameters.MatchingEntityName !== undefined) {
      aliases.push(`MatchingEntityName=@p2`);
      params.append("@p2", formatParameterAlias(this.parameters.MatchingEntityName, "Edm.String"));
    }
    if (this.parameters.PagingInfo !== undefined) {
      aliases.push(`PagingInfo=@p3`);
      params.append("@p3", JSON.stringify(this.parameters.PagingInfo));
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

  async parseResponse(response: Response): Promise<RetrieveDuplicatesResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204) return [];
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return ((await response.json()) as { value: RetrieveDuplicatesResponse }).value;
  }
}
