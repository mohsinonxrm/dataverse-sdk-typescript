import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
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
    public readonly entityFilters: EntityFilters,
    public readonly logicalName: string,
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
        typeof this.entityFilters === "string"
          ? `'${this.entityFilters}'`
          : String(this.entityFilters)
      );
    }
    if (this.logicalName !== undefined) {
      aliases.push(`LogicalName=@p2`);
      params.append(
        "@p2",
        typeof this.logicalName === "string" ? `'${this.logicalName}'` : String(this.logicalName)
      );
    }
    if (this.metadataId !== undefined) {
      aliases.push(`MetadataId=@p3`);
      params.append(
        "@p3",
        typeof this.metadataId === "string" ? `'${this.metadataId}'` : String(this.metadataId)
      );
    }
    if (this.retrieveAsIfPublished !== undefined) {
      aliases.push(`RetrieveAsIfPublished=@p4`);
      params.append(
        "@p4",
        typeof this.retrieveAsIfPublished === "string"
          ? `'${this.retrieveAsIfPublished}'`
          : String(this.retrieveAsIfPublished)
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

  async parseResponse(response: Response): Promise<RetrieveEntityResponse> {
    const data = await response.json();
    return data as RetrieveEntityResponse;
  }
}
