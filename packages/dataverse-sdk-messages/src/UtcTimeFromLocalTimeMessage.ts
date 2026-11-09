import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Parameters of the UtcTimeFromLocalTime message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface UtcTimeFromLocalTimeRequestParameters {
  TimeZoneCode: number;
  LocalTime: string | Date;
}

/**
 * UtcTimeFromLocalTime request message
 *
 * Web API Function: UtcTimeFromLocalTime
 */
export class UtcTimeFromLocalTimeRequest
  extends OrganizationRequest
  implements Executable<UtcTimeFromLocalTimeResponse>
{
  declare readonly Parameters: Readonly<UtcTimeFromLocalTimeRequestParameters>;

  constructor(parameters: UtcTimeFromLocalTimeRequestParameters) {
    super("UtcTimeFromLocalTime", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function (entity collection)
    let url = `${baseUrl}/resourcegroups/Microsoft.Dynamics.CRM.UtcTimeFromLocalTime`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.TimeZoneCode !== undefined) {
      aliases.push(`TimeZoneCode=@p1`);
      params.append("@p1", formatParameterAlias(this.Parameters.TimeZoneCode, "Edm.Int32"));
    }
    if (this.Parameters.LocalTime !== undefined) {
      aliases.push(`LocalTime=@p2`);
      params.append("@p2", formatParameterAlias(this.Parameters.LocalTime, "Edm.DateTimeOffset"));
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
    // The body is the complex value, with its @odata.context
    return UtcTimeFromLocalTimeResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the UtcTimeFromLocalTime function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface UtcTimeFromLocalTimeResult {
  "@odata.context"?: string;
  UtcTime: string;
}

/**
 * UtcTimeFromLocalTime response message
 *
 * `result` is the value the UtcTimeFromLocalTime function returns (see {@link UtcTimeFromLocalTimeResult}).
 */
export class UtcTimeFromLocalTimeResponse extends OrganizationResponse {
  constructor(public result: UtcTimeFromLocalTimeResult) {
    super("UtcTimeFromLocalTime");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): UtcTimeFromLocalTimeResponse {
    return new UtcTimeFromLocalTimeResponse(data as UtcTimeFromLocalTimeResult);
  }
}
