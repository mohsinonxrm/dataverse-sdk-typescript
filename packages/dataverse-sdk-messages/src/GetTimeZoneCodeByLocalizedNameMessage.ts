import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Parameters of the GetTimeZoneCodeByLocalizedName message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GetTimeZoneCodeByLocalizedNameRequestParameters {
  LocalizedStandardName: string;
  LocaleId: number;
}

/**
 * GetTimeZoneCodeByLocalizedName request message
 *
 * Web API Function: GetTimeZoneCodeByLocalizedName
 */
export class GetTimeZoneCodeByLocalizedNameRequest
  extends OrganizationRequest
  implements Executable<GetTimeZoneCodeByLocalizedNameResponse>
{
  declare readonly Parameters: Readonly<GetTimeZoneCodeByLocalizedNameRequestParameters>;

  constructor(parameters: GetTimeZoneCodeByLocalizedNameRequestParameters) {
    super("GetTimeZoneCodeByLocalizedName", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/GetTimeZoneCodeByLocalizedName`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.LocalizedStandardName !== undefined) {
      aliases.push(`LocalizedStandardName=@p1`);
      params.append(
        "@p1",
        formatParameterAlias(this.Parameters.LocalizedStandardName, "Edm.String")
      );
    }
    if (this.Parameters.LocaleId !== undefined) {
      aliases.push(`LocaleId=@p2`);
      params.append("@p2", formatParameterAlias(this.Parameters.LocaleId, "Edm.Int32"));
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
    // The body is the complex value, with its @odata.context
    return GetTimeZoneCodeByLocalizedNameResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the GetTimeZoneCodeByLocalizedName function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface GetTimeZoneCodeByLocalizedNameResult {
  "@odata.context"?: string;
  TimeZoneCode: number;
}

/**
 * GetTimeZoneCodeByLocalizedName response message
 *
 * `result` is the value the GetTimeZoneCodeByLocalizedName function returns (see {@link GetTimeZoneCodeByLocalizedNameResult}).
 */
export class GetTimeZoneCodeByLocalizedNameResponse extends OrganizationResponse {
  constructor(public result: GetTimeZoneCodeByLocalizedNameResult) {
    super("GetTimeZoneCodeByLocalizedName");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): GetTimeZoneCodeByLocalizedNameResponse {
    return new GetTimeZoneCodeByLocalizedNameResponse(data as GetTimeZoneCodeByLocalizedNameResult);
  }
}
