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
 * RetrieveMetadataChanges function
 *
 * Unbound function
 */
export class RetrieveMetadataChangesFunction implements Executable<RetrieveMetadataChangesResponse> {
  constructor(
    public readonly query?: EntityQueryExpression,
    public readonly deletedMetadataFilters?:
      DeletedMetadataFilters | keyof typeof DeletedMetadataFilters,
    public readonly clientVersionStamp?: string,
    public readonly appModuleId?: string,
    public readonly retrieveAllSettings?: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveMetadataChanges`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.query !== undefined) {
      aliases.push(`Query=@p1`);
      params.append("@p1", JSON.stringify(this.query));
    }
    if (this.deletedMetadataFilters !== undefined) {
      aliases.push(`DeletedMetadataFilters=@p2`);
      params.append(
        "@p2",
        formatParameterAlias(
          this.deletedMetadataFilters,
          "mscrm.DeletedMetadataFilters",
          "EnumerationType"
        )
      );
    }
    if (this.clientVersionStamp !== undefined) {
      aliases.push(`ClientVersionStamp=@p3`);
      params.append("@p3", formatParameterAlias(this.clientVersionStamp, "Edm.String"));
    }
    if (this.appModuleId !== undefined) {
      aliases.push(`AppModuleId=@p4`);
      params.append("@p4", formatParameterAlias(this.appModuleId, "Edm.Guid"));
    }
    if (this.retrieveAllSettings !== undefined) {
      aliases.push(`RetrieveAllSettings=@p5`);
      params.append("@p5", formatParameterAlias(this.retrieveAllSettings, "Edm.Boolean"));
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
    const data = await response.json();
    return data as RetrieveMetadataChangesResponse;
  }
}
