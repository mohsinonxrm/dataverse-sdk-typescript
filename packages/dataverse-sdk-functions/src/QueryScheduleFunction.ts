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
 * QuerySchedule function
 *
 * Unbound function
 */
export class QueryScheduleFunction implements Executable<QueryScheduleResponse> {
  constructor(
    public readonly resourceId: string,
    public readonly start: string | Date,
    public readonly end: string | Date,
    public readonly timeCodes: TimeCode[]
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/QuerySchedule`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.resourceId !== undefined) {
      aliases.push(`ResourceId=@p1`);
      params.append("@p1", formatParameterAlias(this.resourceId, "Edm.Guid"));
    }
    if (this.start !== undefined) {
      aliases.push(`Start=@p2`);
      params.append("@p2", formatParameterAlias(this.start, "Edm.DateTimeOffset"));
    }
    if (this.end !== undefined) {
      aliases.push(`End=@p3`);
      params.append("@p3", formatParameterAlias(this.end, "Edm.DateTimeOffset"));
    }
    if (this.timeCodes !== undefined) {
      aliases.push(`TimeCodes=@p4`);
      params.append("@p4", JSON.stringify(this.timeCodes));
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
    const data = await response.json();
    return data as QueryScheduleResponse;
  }
}
