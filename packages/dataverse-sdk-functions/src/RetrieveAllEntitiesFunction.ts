import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { ComplexEntityMetadata, EntityFilters } from "./types/index.js";

/**
 * Response from RetrieveAllEntities function
 */
export interface RetrieveAllEntitiesResponse {
  EntityMetadata: ComplexEntityMetadata[];
  Timestamp: string;
}

/**
 * Parameters of the RetrieveAllEntities function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveAllEntitiesFunctionParameters {
  EntityFilters: EntityFilters | keyof typeof EntityFilters;
  RetrieveAsIfPublished: boolean;
}

/**
 * RetrieveAllEntities function
 *
 * Unbound function
 */
export class RetrieveAllEntitiesFunction implements Executable<RetrieveAllEntitiesResponse> {
  constructor(public readonly parameters: RetrieveAllEntitiesFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveAllEntities`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.EntityFilters !== undefined) {
      aliases.push(`EntityFilters=@p1`);
      params.append(
        "@p1",
        formatParameterAlias(
          this.parameters.EntityFilters,
          "mscrm.EntityFilters",
          "EnumerationType"
        )
      );
    }
    if (this.parameters.RetrieveAsIfPublished !== undefined) {
      aliases.push(`RetrieveAsIfPublished=@p2`);
      params.append(
        "@p2",
        formatParameterAlias(this.parameters.RetrieveAsIfPublished, "Edm.Boolean")
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

  async parseResponse(response: Response): Promise<RetrieveAllEntitiesResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as RetrieveAllEntitiesResponse;
    return (await response.json()) as RetrieveAllEntitiesResponse;
  }
}
