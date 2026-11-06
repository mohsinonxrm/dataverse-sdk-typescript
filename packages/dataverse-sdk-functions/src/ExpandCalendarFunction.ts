import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { TimeInfo } from "./types/index.js";

/**
 * Response from ExpandCalendar function
 */
export interface ExpandCalendarResponse {
  result: TimeInfo[];
}

/**
 * Parameters of the ExpandCalendar function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ExpandCalendarFunctionParameters {
  Start: string | Date;
  End: string | Date;
}

/**
 * ExpandCalendar function
 *
 * Bound function
 * Binding parameter: entity (mscrm.calendar)
 *
 * The first argument is the id of the calendar record to call it on.
 */
export class ExpandCalendarFunction implements Executable<ExpandCalendarResponse> {
  constructor(
    public readonly calendarId: string,
    public readonly parameters: ExpandCalendarFunctionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/calendars(${this.calendarId})/Microsoft.Dynamics.CRM.ExpandCalendar`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.Start !== undefined) {
      aliases.push(`Start=@p1`);
      params.append("@p1", formatParameterAlias(this.parameters.Start, "Edm.DateTimeOffset"));
    }
    if (this.parameters.End !== undefined) {
      aliases.push(`End=@p2`);
      params.append("@p2", formatParameterAlias(this.parameters.End, "Edm.DateTimeOffset"));
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

  async parseResponse(response: Response): Promise<ExpandCalendarResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as ExpandCalendarResponse;
  }
}
