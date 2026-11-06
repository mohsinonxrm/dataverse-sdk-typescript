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
 * Parameters of the QueryMultipleSchedules function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface QueryMultipleSchedulesFunctionParameters {
  Resource: resource[];
  Start: string | Date;
  End: string | Date;
  TimeCodes: TimeCode[];
}

/**
 * QueryMultipleSchedules function
 *
 * Unbound function
 */
export class QueryMultipleSchedulesFunction implements Executable<QueryMultipleSchedulesResponse> {
  constructor(public readonly parameters: QueryMultipleSchedulesFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/QueryMultipleSchedules`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.Resource !== undefined) {
      aliases.push(`Resource=@p1`);
      params.append("@p1", JSON.stringify(this.parameters.Resource));
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

  async parseResponse(response: Response): Promise<QueryMultipleSchedulesResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as QueryMultipleSchedulesResponse;
    return (await response.json()) as QueryMultipleSchedulesResponse;
  }
}
