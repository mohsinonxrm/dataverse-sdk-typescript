import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Response from the LocalTimeFromUtcTime function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface LocalTimeFromUtcTimeResponse {
  "@odata.context"?: string;
  LocalTime: string;
}

/**
 * Parameters of the LocalTimeFromUtcTime function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface LocalTimeFromUtcTimeFunctionParameters {
  TimeZoneCode: number;
  UtcTime: string | Date;
}

/**
 * LocalTimeFromUtcTime function
 *
 * Unbound function
 */
export class LocalTimeFromUtcTimeFunction implements Executable<LocalTimeFromUtcTimeResponse> {
  constructor(public readonly parameters: LocalTimeFromUtcTimeFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/LocalTimeFromUtcTime`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.TimeZoneCode !== undefined) {
      aliases.push(`TimeZoneCode=@p1`);
      params.append("@p1", formatParameterAlias(this.parameters.TimeZoneCode, "Edm.Int32"));
    }
    if (this.parameters.UtcTime !== undefined) {
      aliases.push(`UtcTime=@p2`);
      params.append("@p2", formatParameterAlias(this.parameters.UtcTime, "Edm.DateTimeOffset"));
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as LocalTimeFromUtcTimeResponse;
  }
}
