import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Response from UtcTimeFromLocalTime function
 */
export interface UtcTimeFromLocalTimeResponse {
  UtcTime: string;
}

/**
 * Parameters of the UtcTimeFromLocalTime function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface UtcTimeFromLocalTimeFunctionParameters {
  TimeZoneCode: number;
  LocalTime: string | Date;
}

/**
 * UtcTimeFromLocalTime function
 *
 * Bound function
 * Binding parameter: entityset (Collection(mscrm.resourcegroup))
 */
export class UtcTimeFromLocalTimeFunction implements Executable<UtcTimeFromLocalTimeResponse> {
  constructor(public readonly parameters: UtcTimeFromLocalTimeFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function (entity collection)
    let url = `${baseUrl}/resourcegroups/Microsoft.Dynamics.CRM.UtcTimeFromLocalTime`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.TimeZoneCode !== undefined) {
      aliases.push(`TimeZoneCode=@p1`);
      params.append("@p1", formatParameterAlias(this.parameters.TimeZoneCode, "Edm.Int32"));
    }
    if (this.parameters.LocalTime !== undefined) {
      aliases.push(`LocalTime=@p2`);
      params.append("@p2", formatParameterAlias(this.parameters.LocalTime, "Edm.DateTimeOffset"));
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as UtcTimeFromLocalTimeResponse;
    return (await response.json()) as UtcTimeFromLocalTimeResponse;
  }
}
