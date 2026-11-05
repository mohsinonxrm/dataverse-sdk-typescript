import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatAliasValue } from "./internal/odataLiteral.js";
import type { ComplexEntityMetadata, EntityFilters } from "./types/index.js";

/**
 * Response from RetrieveAllEntities function
 */
export interface RetrieveAllEntitiesResponse {
  EntityMetadata: ComplexEntityMetadata[];
  Timestamp: string;
}

/**
 * RetrieveAllEntities function
 *
 * Unbound function
 */
export class RetrieveAllEntitiesFunction implements Executable<RetrieveAllEntitiesResponse> {
  constructor(
    public readonly entityFilters: EntityFilters,
    public readonly retrieveAsIfPublished: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveAllEntities`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.entityFilters !== undefined) {
      aliases.push(`EntityFilters=@p1`);
      params.append("@p1", formatAliasValue(this.entityFilters));
    }
    if (this.retrieveAsIfPublished !== undefined) {
      aliases.push(`RetrieveAsIfPublished=@p2`);
      params.append("@p2", formatAliasValue(this.retrieveAsIfPublished));
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

  async parseResponse(response: Response): Promise<RetrieveAllEntitiesResponse> {
    const data = await response.json();
    return data as RetrieveAllEntitiesResponse;
  }
}
