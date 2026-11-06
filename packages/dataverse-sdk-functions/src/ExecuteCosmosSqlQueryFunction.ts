import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { ParameterCollection } from "./types/index.js";

/**
 * Response from the ExecuteCosmosSqlQuery function.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type ExecuteCosmosSqlQueryResponse = {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
} | null;

/**
 * Parameters of the ExecuteCosmosSqlQuery function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ExecuteCosmosSqlQueryFunctionParameters {
  QueryText: string;
  EntityLogicalName: string;
  QueryParameters?: ParameterCollection;
  PageSize?: number;
  PagingCookie?: string;
  PartitionId?: string;
}

/**
 * ExecuteCosmosSqlQuery function
 *
 * Unbound function
 */
export class ExecuteCosmosSqlQueryFunction implements Executable<ExecuteCosmosSqlQueryResponse> {
  constructor(public readonly parameters: ExecuteCosmosSqlQueryFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/ExecuteCosmosSqlQuery`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.QueryText !== undefined) {
      aliases.push(`QueryText=@p1`);
      params.append("@p1", formatParameterAlias(this.parameters.QueryText, "Edm.String"));
    }
    if (this.parameters.EntityLogicalName !== undefined) {
      aliases.push(`EntityLogicalName=@p2`);
      params.append("@p2", formatParameterAlias(this.parameters.EntityLogicalName, "Edm.String"));
    }
    if (this.parameters.QueryParameters !== undefined) {
      aliases.push(`QueryParameters=@p3`);
      params.append("@p3", JSON.stringify(this.parameters.QueryParameters));
    }
    if (this.parameters.PageSize !== undefined) {
      aliases.push(`PageSize=@p4`);
      params.append("@p4", formatParameterAlias(this.parameters.PageSize, "Edm.Int64"));
    }
    if (this.parameters.PagingCookie !== undefined) {
      aliases.push(`PagingCookie=@p5`);
      params.append("@p5", formatParameterAlias(this.parameters.PagingCookie, "Edm.String"));
    }
    if (this.parameters.PartitionId !== undefined) {
      aliases.push(`PartitionId=@p6`);
      params.append("@p6", formatParameterAlias(this.parameters.PartitionId, "Edm.String"));
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
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return null;
    // The body is the record, with its annotations
    return (await response.json()) as ExecuteCosmosSqlQueryResponse;
  }
}
