import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type {
  ComplexEntityMetadata,
  DeletedMetadataCollection,
  DeletedMetadataFilters,
  EntityQueryExpression,
} from "./types/index.js";

/**
 * Response from RetrieveMetadataChanges function
 */
export interface RetrieveMetadataChangesResponse {
  ServerVersionStamp: string;
  DeletedMetadata: DeletedMetadataCollection;
  EntityMetadata: ComplexEntityMetadata[];
}

/**
 * Parameters of the RetrieveMetadataChanges function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveMetadataChangesFunctionParameters {
  Query?: EntityQueryExpression;
  DeletedMetadataFilters?: DeletedMetadataFilters | keyof typeof DeletedMetadataFilters;
  ClientVersionStamp?: string;
  AppModuleId?: string;
  RetrieveAllSettings?: boolean;
}

/**
 * RetrieveMetadataChanges function
 *
 * Unbound function
 */
export class RetrieveMetadataChangesFunction implements Executable<RetrieveMetadataChangesResponse> {
  constructor(public readonly parameters: RetrieveMetadataChangesFunctionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveMetadataChanges`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.Query !== undefined) {
      aliases.push(`Query=@p1`);
      params.append("@p1", JSON.stringify(this.parameters.Query));
    }
    if (this.parameters.DeletedMetadataFilters !== undefined) {
      aliases.push(`DeletedMetadataFilters=@p2`);
      params.append(
        "@p2",
        formatParameterAlias(
          this.parameters.DeletedMetadataFilters,
          "mscrm.DeletedMetadataFilters",
          "EnumerationType"
        )
      );
    }
    if (this.parameters.ClientVersionStamp !== undefined) {
      aliases.push(`ClientVersionStamp=@p3`);
      params.append("@p3", formatParameterAlias(this.parameters.ClientVersionStamp, "Edm.String"));
    }
    if (this.parameters.AppModuleId !== undefined) {
      aliases.push(`AppModuleId=@p4`);
      params.append("@p4", formatParameterAlias(this.parameters.AppModuleId, "Edm.Guid"));
    }
    if (this.parameters.RetrieveAllSettings !== undefined) {
      aliases.push(`RetrieveAllSettings=@p5`);
      params.append(
        "@p5",
        formatParameterAlias(this.parameters.RetrieveAllSettings, "Edm.Boolean")
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

  async parseResponse(response: Response): Promise<RetrieveMetadataChangesResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as RetrieveMetadataChangesResponse;
    return (await response.json()) as RetrieveMetadataChangesResponse;
  }
}
