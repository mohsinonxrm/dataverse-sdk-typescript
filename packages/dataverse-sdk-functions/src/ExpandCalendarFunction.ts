import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { TimeInfo } from "./types/index.js";

/**
 * Response from ExpandCalendar function
 */
export interface ExpandCalendarResponse {
  result: TimeInfo[];
}

/**
 * ExpandCalendar function
 *
 * Bound function
 * Binding parameter: entity (mscrm.calendar)
 */
export class ExpandCalendarFunction implements Executable<ExpandCalendarResponse> {
  constructor(
    public readonly calendarId: string,
    public readonly start: string,
    public readonly end: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/calendars(${this.calendarId})/Microsoft.Dynamics.CRM.ExpandCalendar`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.start !== undefined) {
      aliases.push(`Start=@p1`);
      params.append("@p1", typeof this.start === "string" ? `'${this.start}'` : String(this.start));
    }
    if (this.end !== undefined) {
      aliases.push(`End=@p2`);
      params.append("@p2", typeof this.end === "string" ? `'${this.end}'` : String(this.end));
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
    const data = await response.json();
    return data as ExpandCalendarResponse;
  }
}
