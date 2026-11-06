import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { TimeCode, TimeInfoCollection, resource } from "./types/index.js";

/**
 * Response from QueryMultipleSchedules function
 */
export interface QueryMultipleSchedulesResponse {
  TimeInfos: TimeInfoCollection[];
}

/**
 * QueryMultipleSchedules function
 *
 * Unbound function
 */
export class QueryMultipleSchedulesFunction implements Executable<QueryMultipleSchedulesResponse> {
  constructor(
    public readonly resource: resource[],
    public readonly start: string | Date,
    public readonly end: string | Date,
    public readonly timeCodes: TimeCode[]
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/QueryMultipleSchedules`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.resource !== undefined) {
      aliases.push(`Resource=@p1`);
      params.append("@p1", JSON.stringify(this.resource));
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

  async parseResponse(response: Response): Promise<QueryMultipleSchedulesResponse> {
    const data = await response.json();
    return data as QueryMultipleSchedulesResponse;
  }
}
