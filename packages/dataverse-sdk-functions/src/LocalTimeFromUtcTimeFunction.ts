import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Response from LocalTimeFromUtcTime function
 */
export interface LocalTimeFromUtcTimeResponse {
  LocalTime: string;
}

/**
 * LocalTimeFromUtcTime function
 *
 * Unbound function
 */
export class LocalTimeFromUtcTimeFunction implements Executable<LocalTimeFromUtcTimeResponse> {
  constructor(
    public readonly timeZoneCode: number,
    public readonly utcTime: string | Date
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/LocalTimeFromUtcTime`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.timeZoneCode !== undefined) {
      aliases.push(`TimeZoneCode=@p1`);
      params.append("@p1", formatParameterAlias(this.timeZoneCode, "Edm.Int32"));
    }
    if (this.utcTime !== undefined) {
      aliases.push(`UtcTime=@p2`);
      params.append("@p2", formatParameterAlias(this.utcTime, "Edm.DateTimeOffset"));
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

  async parseResponse(response: Response): Promise<LocalTimeFromUtcTimeResponse> {
    const data = await response.json();
    return data as LocalTimeFromUtcTimeResponse;
  }
}
