import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { ComplexEntityMetadata, EntityFilters } from "./types/index.js";

/**
 * Response from RetrieveEntity function
 */
export interface RetrieveEntityResponse {
  EntityMetadata: ComplexEntityMetadata;
}

/**
 * RetrieveEntity function
 *
 * Unbound function
 */
export class RetrieveEntityFunction implements Executable<RetrieveEntityResponse> {
  constructor(
    public readonly entityFilters: EntityFilters | keyof typeof EntityFilters,
    public readonly logicalName: string | undefined,
    public readonly metadataId: string,
    public readonly retrieveAsIfPublished: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveEntity`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.entityFilters !== undefined) {
      aliases.push(`EntityFilters=@p1`);
      params.append(
        "@p1",
        formatParameterAlias(this.entityFilters, "mscrm.EntityFilters", "EnumerationType")
      );
    }
    if (this.logicalName !== undefined) {
      aliases.push(`LogicalName=@p2`);
      params.append("@p2", formatParameterAlias(this.logicalName, "Edm.String"));
    }
    if (this.metadataId !== undefined) {
      aliases.push(`MetadataId=@p3`);
      params.append("@p3", formatParameterAlias(this.metadataId, "Edm.Guid"));
    }
    if (this.retrieveAsIfPublished !== undefined) {
      aliases.push(`RetrieveAsIfPublished=@p4`);
      params.append("@p4", formatParameterAlias(this.retrieveAsIfPublished, "Edm.Boolean"));
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

  async parseResponse(response: Response): Promise<RetrieveEntityResponse> {
    const data = await response.json();
    return data as RetrieveEntityResponse;
  }
}
