import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Response from GetTimeZoneCodeByLocalizedName function
 */
export interface GetTimeZoneCodeByLocalizedNameResponse {
  TimeZoneCode: number;
}

/**
 * Parameters of the GetTimeZoneCodeByLocalizedName function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GetTimeZoneCodeByLocalizedNameFunctionParameters {
  LocalizedStandardName: string;
  LocaleId: number;
}

/**
 * GetTimeZoneCodeByLocalizedName function
 *
 * Unbound function
 */
export class GetTimeZoneCodeByLocalizedNameFunction implements Executable<GetTimeZoneCodeByLocalizedNameResponse> {
  constructor(public readonly parameters: GetTimeZoneCodeByLocalizedNameFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/GetTimeZoneCodeByLocalizedName`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.LocalizedStandardName !== undefined) {
      aliases.push(`LocalizedStandardName=@p1`);
      params.append(
        "@p1",
        formatParameterAlias(this.parameters.LocalizedStandardName, "Edm.String")
      );
    }
    if (this.parameters.LocaleId !== undefined) {
      aliases.push(`LocaleId=@p2`);
      params.append("@p2", formatParameterAlias(this.parameters.LocaleId, "Edm.Int32"));
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as GetTimeZoneCodeByLocalizedNameResponse;
    return (await response.json()) as GetTimeZoneCodeByLocalizedNameResponse;
  }
}
