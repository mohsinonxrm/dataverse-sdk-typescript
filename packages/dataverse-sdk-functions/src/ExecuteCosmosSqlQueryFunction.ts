import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { EntityReference } from "./types/EntityReference.js";
import type { ParameterCollection } from "./types/index.js";

/**
 * Response from ExecuteCosmosSqlQuery function
 */
export interface ExecuteCosmosSqlQueryResponse {
  value: EntityReference;
}

/**
 * ExecuteCosmosSqlQuery function
 *
 * Unbound function
 */
export class ExecuteCosmosSqlQueryFunction implements Executable<ExecuteCosmosSqlQueryResponse> {
  constructor(
    public readonly queryText: string,
    public readonly entityLogicalName: string,
    public readonly queryParameters?: ParameterCollection,
    public readonly pageSize?: number,
    public readonly pagingCookie?: string,
    public readonly partitionId?: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/ExecuteCosmosSqlQuery`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.queryText !== undefined) {
      aliases.push(`QueryText=@p1`);
      params.append("@p1", formatParameterAlias(this.queryText, "Edm.String"));
    }
    if (this.entityLogicalName !== undefined) {
      aliases.push(`EntityLogicalName=@p2`);
      params.append("@p2", formatParameterAlias(this.entityLogicalName, "Edm.String"));
    }
    if (this.queryParameters !== undefined) {
      aliases.push(`QueryParameters=@p3`);
      params.append("@p3", JSON.stringify(this.queryParameters));
    }
    if (this.pageSize !== undefined) {
      aliases.push(`PageSize=@p4`);
      params.append("@p4", formatParameterAlias(this.pageSize, "Edm.Int64"));
    }
    if (this.pagingCookie !== undefined) {
      aliases.push(`PagingCookie=@p5`);
      params.append("@p5", formatParameterAlias(this.pagingCookie, "Edm.String"));
    }
    if (this.partitionId !== undefined) {
      aliases.push(`PartitionId=@p6`);
      params.append("@p6", formatParameterAlias(this.partitionId, "Edm.String"));
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

  async parseResponse(response: Response): Promise<ExecuteCosmosSqlQueryResponse> {
    const data = await response.json();
    return data as ExecuteCosmosSqlQueryResponse;
  }
}
