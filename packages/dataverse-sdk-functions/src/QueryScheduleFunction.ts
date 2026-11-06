import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { TimeCode, TimeInfo } from "./types/index.js";

/**
 * Response from QuerySchedule function
 */
export interface QueryScheduleResponse {
  TimeInfos: TimeInfo[];
}

/**
 * Parameters of the QuerySchedule function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface QueryScheduleFunctionParameters {
  ResourceId: string;
  Start: string | Date;
  End: string | Date;
  TimeCodes: TimeCode[];
}

/**
 * QuerySchedule function
 *
 * Unbound function
 */
export class QueryScheduleFunction implements Executable<QueryScheduleResponse> {
  constructor(public readonly parameters: QueryScheduleFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/QuerySchedule`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.ResourceId !== undefined) {
      aliases.push(`ResourceId=@p1`);
      params.append("@p1", formatParameterAlias(this.parameters.ResourceId, "Edm.Guid"));
    }
    if (this.parameters.Start !== undefined) {
      aliases.push(`Start=@p2`);
      params.append("@p2", formatParameterAlias(this.parameters.Start, "Edm.DateTimeOffset"));
    }
    if (this.parameters.End !== undefined) {
      aliases.push(`End=@p3`);
      params.append("@p3", formatParameterAlias(this.parameters.End, "Edm.DateTimeOffset"));
    }
    if (this.parameters.TimeCodes !== undefined) {
      aliases.push(`TimeCodes=@p4`);
      params.append("@p4", JSON.stringify(this.parameters.TimeCodes));
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as QueryScheduleResponse;
  }
}
