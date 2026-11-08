import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { ParameterCollection } from "./types/index.js";

/**
 * Parameters of the ExecuteCosmosSqlQuery message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ExecuteCosmosSqlQueryRequestParameters {
  QueryText: string;
  EntityLogicalName: string;
  QueryParameters?: ParameterCollection;
  PageSize?: number;
  PagingCookie?: string;
  PartitionId?: string;
}

/**
 * ExecuteCosmosSqlQuery request message
 *
 * Web API Function: ExecuteCosmosSqlQuery
 */
export class ExecuteCosmosSqlQueryRequest
  extends OrganizationRequest
  implements Executable<ExecuteCosmosSqlQueryResponse>
{
  declare readonly Parameters: Readonly<ExecuteCosmosSqlQueryRequestParameters>;

  constructor(parameters: ExecuteCosmosSqlQueryRequestParameters) {
    super("ExecuteCosmosSqlQuery", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/ExecuteCosmosSqlQuery`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.QueryText !== undefined) {
      aliases.push(`QueryText=@p1`);
      params.append("@p1", formatParameterAlias(this.Parameters.QueryText, "Edm.String"));
    }
    if (this.Parameters.EntityLogicalName !== undefined) {
      aliases.push(`EntityLogicalName=@p2`);
      params.append("@p2", formatParameterAlias(this.Parameters.EntityLogicalName, "Edm.String"));
    }
    if (this.Parameters.QueryParameters !== undefined) {
      aliases.push(`QueryParameters=@p3`);
      params.append(
        "@p3",
        formatParameterAlias(
          this.Parameters.QueryParameters,
          "mscrm.ParameterCollection",
          "ComplexType"
        )
      );
    }
    if (this.Parameters.PageSize !== undefined) {
      aliases.push(`PageSize=@p4`);
      params.append("@p4", formatParameterAlias(this.Parameters.PageSize, "Edm.Int64"));
    }
    if (this.Parameters.PagingCookie !== undefined) {
      aliases.push(`PagingCookie=@p5`);
      params.append("@p5", formatParameterAlias(this.Parameters.PagingCookie, "Edm.String"));
    }
    if (this.Parameters.PartitionId !== undefined) {
      aliases.push(`PartitionId=@p6`);
      params.append("@p6", formatParameterAlias(this.Parameters.PartitionId, "Edm.String"));
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
    if (response.status === 204) return ExecuteCosmosSqlQueryResponse.fromResponse(undefined);
    // The body is the record, with its annotations
    return ExecuteCosmosSqlQueryResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the ExecuteCosmosSqlQuery function.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type ExecuteCosmosSqlQueryResult = {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
} | null;

/**
 * ExecuteCosmosSqlQuery response message
 *
 * `result` is the value the ExecuteCosmosSqlQuery function returns (see {@link ExecuteCosmosSqlQueryResult}).
 */
export class ExecuteCosmosSqlQueryResponse extends OrganizationResponse {
  constructor(public result: ExecuteCosmosSqlQueryResult) {
    super("ExecuteCosmosSqlQuery");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): ExecuteCosmosSqlQueryResponse {
    return new ExecuteCosmosSqlQueryResponse((data ?? null) as ExecuteCosmosSqlQueryResult);
  }
}
