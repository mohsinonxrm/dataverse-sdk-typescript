import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { SettingDetail } from "./types/index.js";

/**
 * Parameters of the RetrieveSetting message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveSettingRequestParameters {
  AppUniqueName?: string;
  SettingName: string;
}

/**
 * RetrieveSetting request message
 *
 * Web API Function: RetrieveSetting
 */
export class RetrieveSettingRequest
  extends OrganizationRequest
  implements Executable<RetrieveSettingResponse>
{
  declare readonly Parameters: Readonly<RetrieveSettingRequestParameters>;

  constructor(parameters: RetrieveSettingRequestParameters) {
    super("RetrieveSetting", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveSetting`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.AppUniqueName !== undefined) {
      aliases.push(`AppUniqueName=@p1`);
      params.append("@p1", formatParameterAlias(this.Parameters.AppUniqueName, "Edm.String"));
    }
    if (this.Parameters.SettingName !== undefined) {
      aliases.push(`SettingName=@p2`);
      params.append("@p2", formatParameterAlias(this.Parameters.SettingName, "Edm.String"));
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

  async parseResponse(response: Response): Promise<RetrieveSettingResponse> {
    // The body is the complex value, with its @odata.context
    return RetrieveSettingResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveSetting function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveSettingResult {
  "@odata.context"?: string;
  SettingDetail: SettingDetail;
}

/**
 * RetrieveSetting response message
 *
 * `result` is the value the RetrieveSetting function returns (see {@link RetrieveSettingResult}).
 */
export class RetrieveSettingResponse extends OrganizationResponse {
  constructor(public result: RetrieveSettingResult) {
    super("RetrieveSetting");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveSettingResponse {
    return new RetrieveSettingResponse(data as RetrieveSettingResult);
  }
}
