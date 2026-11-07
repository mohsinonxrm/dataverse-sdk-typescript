import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { ComplexEntityMetadata, EntityFilters } from "./types/index.js";

/**
 * Response from the RetrieveEntity function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveEntityResponse {
  "@odata.context"?: string;
  EntityMetadata: ComplexEntityMetadata;
}

/**
 * Parameters of the RetrieveEntity function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveEntityFunctionParameters {
  EntityFilters: EntityFilters | keyof typeof EntityFilters;
  LogicalName?: string;
  MetadataId: string;
  RetrieveAsIfPublished: boolean;
}

/**
 * RetrieveEntity function
 *
 * Unbound function
 */
export class RetrieveEntityFunction implements Executable<RetrieveEntityResponse> {
  constructor(public readonly parameters: RetrieveEntityFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveEntity`;

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
    if (this.parameters.LogicalName !== undefined) {
      aliases.push(`LogicalName=@p2`);
      params.append("@p2", formatParameterAlias(this.parameters.LogicalName, "Edm.String"));
    }
    if (this.parameters.MetadataId !== undefined) {
      aliases.push(`MetadataId=@p3`);
      params.append("@p3", formatParameterAlias(this.parameters.MetadataId, "Edm.Guid"));
    }
    if (this.parameters.RetrieveAsIfPublished !== undefined) {
      aliases.push(`RetrieveAsIfPublished=@p4`);
      params.append(
        "@p4",
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

  async parseResponse(response: Response): Promise<RetrieveEntityResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as RetrieveEntityResponse;
  }
}
