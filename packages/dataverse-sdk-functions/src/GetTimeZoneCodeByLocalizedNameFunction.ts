import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Response from GetTimeZoneCodeByLocalizedName function
 */
export interface GetTimeZoneCodeByLocalizedNameResponse {
  TimeZoneCode: number;
}

/**
 * GetTimeZoneCodeByLocalizedName function
 *
 * Unbound function
 */
export class GetTimeZoneCodeByLocalizedNameFunction implements Executable<GetTimeZoneCodeByLocalizedNameResponse> {
  constructor(
    public readonly localizedStandardName: string,
    public readonly localeId: number
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/GetTimeZoneCodeByLocalizedName`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.localizedStandardName !== undefined) {
      aliases.push(`LocalizedStandardName=@p1`);
      params.append("@p1", formatParameterAlias(this.localizedStandardName, "Edm.String"));
    }
    if (this.localeId !== undefined) {
      aliases.push(`LocaleId=@p2`);
      params.append("@p2", formatParameterAlias(this.localeId, "Edm.Int32"));
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

  async parseResponse(response: Response): Promise<GetTimeZoneCodeByLocalizedNameResponse> {
    const data = await response.json();
    return data as GetTimeZoneCodeByLocalizedNameResponse;
  }
}
