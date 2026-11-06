import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatAliasValue } from "./internal/odataLiteral.js";

/**
 * Response from UtcTimeFromLocalTime function
 */
export interface UtcTimeFromLocalTimeResponse {
  UtcTime: string;
}

/**
 * UtcTimeFromLocalTime function
 *
 * Bound function
 * Binding parameter: entityset (Collection(mscrm.resourcegroup))
 */
export class UtcTimeFromLocalTimeFunction implements Executable<UtcTimeFromLocalTimeResponse> {
  constructor(
    public readonly timeZoneCode: number,
    public readonly localTime: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function (entity collection)
    let url = `${baseUrl}/resourcegroups/Microsoft.Dynamics.CRM.UtcTimeFromLocalTime`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.timeZoneCode !== undefined) {
      aliases.push(`TimeZoneCode=@p1`);
      params.append("@p1", formatAliasValue(this.timeZoneCode));
    }
    if (this.localTime !== undefined) {
      aliases.push(`LocalTime=@p2`);
      params.append("@p2", formatAliasValue(this.localTime));
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

  async parseResponse(response: Response): Promise<UtcTimeFromLocalTimeResponse> {
    const data = await response.json();
    return data as UtcTimeFromLocalTimeResponse;
  }
}
