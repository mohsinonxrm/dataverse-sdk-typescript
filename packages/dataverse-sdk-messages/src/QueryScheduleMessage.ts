import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { enumBody } from "./internal/enumBody.js";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { TimeCode, TimeInfo } from "./types/index.js";

/**
 * Parameters of the QuerySchedule message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface QueryScheduleRequestParameters {
  ResourceId: string;
  Start: string | Date;
  End: string | Date;
  TimeCodes: TimeCode[];
}

/**
 * QuerySchedule request message
 *
 * Web API Function: QuerySchedule
 */
export class QueryScheduleRequest
  extends OrganizationRequest
  implements Executable<QueryScheduleResponse>
{
  declare readonly Parameters: Readonly<QueryScheduleRequestParameters>;

  constructor(parameters: QueryScheduleRequestParameters) {
    super("QuerySchedule", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/QuerySchedule`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.ResourceId !== undefined) {
      aliases.push(`ResourceId=@p1`);
      params.append("@p1", formatParameterAlias(this.Parameters.ResourceId, "Edm.Guid"));
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

  async parseResponse(response: Response): Promise<QueryScheduleResponse> {
    // The body is the complex value, with its @odata.context
    return QueryScheduleResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the QuerySchedule function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface QueryScheduleResult {
  "@odata.context"?: string;
  TimeInfos: TimeInfo[];
}

/**
 * QuerySchedule response message
 *
 * `result` is the value the QuerySchedule function returns (see {@link QueryScheduleResult}).
 */
export class QueryScheduleResponse extends OrganizationResponse {
  constructor(public result: QueryScheduleResult) {
    super("QuerySchedule");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): QueryScheduleResponse {
    return new QueryScheduleResponse(data as QueryScheduleResult);
  }
}
