import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Parameters of the LocalTimeFromUtcTime message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface LocalTimeFromUtcTimeRequestParameters {
  TimeZoneCode: number;
  UtcTime: string | Date;
}

/**
 * LocalTimeFromUtcTime request message
 *
 * Web API Function: LocalTimeFromUtcTime
 */
export class LocalTimeFromUtcTimeRequest
  extends OrganizationRequest
  implements Executable<LocalTimeFromUtcTimeResponse>
{
  declare readonly Parameters: Readonly<LocalTimeFromUtcTimeRequestParameters>;

  constructor(parameters: LocalTimeFromUtcTimeRequestParameters) {
    super("LocalTimeFromUtcTime", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/LocalTimeFromUtcTime`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.TimeZoneCode !== undefined) {
      aliases.push(`TimeZoneCode=@p1`);
      params.append("@p1", formatParameterAlias(this.Parameters.TimeZoneCode, "Edm.Int32"));
    }
    if (this.Parameters.UtcTime !== undefined) {
      aliases.push(`UtcTime=@p2`);
      params.append("@p2", formatParameterAlias(this.Parameters.UtcTime, "Edm.DateTimeOffset"));
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
    return LocalTimeFromUtcTimeResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the LocalTimeFromUtcTime function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface LocalTimeFromUtcTimeResult {
  "@odata.context"?: string;
  LocalTime: string;
}

/**
 * LocalTimeFromUtcTime response message
 *
 * `result` is the value the LocalTimeFromUtcTime function returns (see {@link LocalTimeFromUtcTimeResult}).
 */
export class LocalTimeFromUtcTimeResponse extends OrganizationResponse {
  constructor(public result: LocalTimeFromUtcTimeResult) {
    super("LocalTimeFromUtcTime");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): LocalTimeFromUtcTimeResponse {
    return new LocalTimeFromUtcTimeResponse(data as LocalTimeFromUtcTimeResult);
  }
}
