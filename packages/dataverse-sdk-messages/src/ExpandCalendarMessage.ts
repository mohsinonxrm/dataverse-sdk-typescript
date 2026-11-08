import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { TimeInfo } from "./types/index.js";

/**
 * Parameters of the ExpandCalendar message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ExpandCalendarRequestParameters {
  Start: string | Date;
  End: string | Date;
}

/**
 * ExpandCalendar request message
 *
 * Web API Function: ExpandCalendar
 *
 * The first argument is the id of the calendar record to call it on.
 */
export class ExpandCalendarRequest
  extends OrganizationRequest
  implements Executable<ExpandCalendarResponse>
{
  declare readonly Parameters: Readonly<ExpandCalendarRequestParameters>;

  constructor(
    public calendarId: string,
    parameters: ExpandCalendarRequestParameters
  ) {
    super("ExpandCalendar", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/calendars(${odataLiteral.guid(this.calendarId)})/Microsoft.Dynamics.CRM.ExpandCalendar`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.Start !== undefined) {
      aliases.push(`Start=@p1`);
      params.append("@p1", formatParameterAlias(this.Parameters.Start, "Edm.DateTimeOffset"));
    }
    if (this.Parameters.End !== undefined) {
      aliases.push(`End=@p2`);
      params.append("@p2", formatParameterAlias(this.Parameters.End, "Edm.DateTimeOffset"));
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
    // The body is the complex value, with its @odata.context
    return ExpandCalendarResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the ExpandCalendar function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface ExpandCalendarResult {
  "@odata.context"?: string;
  result: TimeInfo[];
}

/**
 * ExpandCalendar response message
 *
 * `result` is the value the ExpandCalendar function returns (see {@link ExpandCalendarResult}).
 */
export class ExpandCalendarResponse extends OrganizationResponse {
  constructor(public result: ExpandCalendarResult) {
    super("ExpandCalendar");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): ExpandCalendarResponse {
    return new ExpandCalendarResponse(data as ExpandCalendarResult);
  }
}
