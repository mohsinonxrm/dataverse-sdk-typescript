import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
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
    public readonly start: string,
    public readonly end: string,
    public readonly timeCodes: TimeCode[]
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/QuerySchedule`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.resourceId !== undefined) {
      aliases.push(`ResourceId=@p1`);
      params.append(
        "@p1",
        typeof this.resourceId === "string" ? `'${this.resourceId}'` : String(this.resourceId)
      );
    }
    if (this.start !== undefined) {
      aliases.push(`Start=@p2`);
      params.append("@p2", typeof this.start === "string" ? `'${this.start}'` : String(this.start));
    }
    if (this.end !== undefined) {
      aliases.push(`End=@p3`);
      params.append("@p3", typeof this.end === "string" ? `'${this.end}'` : String(this.end));
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
