import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { enumBody } from "./internal/enumBody.js";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { TimeCode, TimeInfoCollection, resource } from "./types/index.js";

/**
 * Parameters of the QueryMultipleSchedules message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface QueryMultipleSchedulesRequestParameters {
  Resource: resource[];
  Start: string | Date;
  End: string | Date;
  TimeCodes: TimeCode[];
}

/**
 * QueryMultipleSchedules request message
 *
 * Web API Function: QueryMultipleSchedules
 */
export class QueryMultipleSchedulesRequest
  extends OrganizationRequest
  implements Executable<QueryMultipleSchedulesResponse>
{
  declare readonly Parameters: Readonly<QueryMultipleSchedulesRequestParameters>;

  constructor(parameters: QueryMultipleSchedulesRequestParameters) {
    super("QueryMultipleSchedules", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/QueryMultipleSchedules`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.Resource !== undefined) {
      aliases.push(`Resource=@p1`);
      params.append(
        "@p1",
        formatParameterAlias(this.Parameters.Resource, "Collection(mscrm.resource)", "Collection")
      );
    }
    if (this.Parameters.Start !== undefined) {
      aliases.push(`Start=@p2`);
      params.append("@p2", formatParameterAlias(this.Parameters.Start, "Edm.DateTimeOffset"));
    }
    if (this.Parameters.End !== undefined) {
      aliases.push(`End=@p3`);
      params.append("@p3", formatParameterAlias(this.Parameters.End, "Edm.DateTimeOffset"));
    }
    if (this.Parameters.TimeCodes !== undefined) {
      aliases.push(`TimeCodes=@p4`);
      params.append(
        "@p4",
        formatParameterAlias(
          enumBody(this.Parameters.TimeCodes, "TimeCode"),
          "Collection(mscrm.TimeCode)",
          "Collection"
        )
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

  async parseResponse(response: Response): Promise<QueryMultipleSchedulesResponse> {
    // The body is the complex value, with its @odata.context
    return QueryMultipleSchedulesResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the QueryMultipleSchedules function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface QueryMultipleSchedulesResult {
  "@odata.context"?: string;
  TimeInfos: TimeInfoCollection[];
}

/**
 * QueryMultipleSchedules response message
 *
 * `result` is the value the QueryMultipleSchedules function returns (see {@link QueryMultipleSchedulesResult}).
 */
export class QueryMultipleSchedulesResponse extends OrganizationResponse {
  constructor(public result: QueryMultipleSchedulesResult) {
    super("QueryMultipleSchedules");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): QueryMultipleSchedulesResponse {
    return new QueryMultipleSchedulesResponse(data as QueryMultipleSchedulesResult);
  }
}
