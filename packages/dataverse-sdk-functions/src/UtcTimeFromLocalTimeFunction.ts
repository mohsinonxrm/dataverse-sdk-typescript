import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
    let url = `${baseUrl}/UtcTimeFromLocalTime`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.timeZoneCode !== undefined) {
      aliases.push(`TimeZoneCode=@p1`);
      params.append(
        "@p1",
        typeof this.timeZoneCode === "string" ? `'${this.timeZoneCode}'` : String(this.timeZoneCode)
      );
    }
    if (this.localTime !== undefined) {
      aliases.push(`LocalTime=@p2`);
      params.append(
        "@p2",
        typeof this.localTime === "string" ? `'${this.localTime}'` : String(this.localTime)
      );
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
