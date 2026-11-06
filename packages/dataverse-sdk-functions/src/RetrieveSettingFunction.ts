import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { SettingDetail } from "./types/index.js";

/**
 * Response from RetrieveSetting function
 */
export interface RetrieveSettingResponse {
  SettingDetail: SettingDetail;
}

/**
 * Parameters of the RetrieveSetting function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveSettingFunctionParameters {
  AppUniqueName?: string;
  SettingName: string;
}

/**
 * RetrieveSetting function
 *
 * Unbound function
 */
export class RetrieveSettingFunction implements Executable<RetrieveSettingResponse> {
  constructor(public readonly parameters: RetrieveSettingFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveSetting`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.AppUniqueName !== undefined) {
      aliases.push(`AppUniqueName=@p1`);
      params.append("@p1", formatParameterAlias(this.parameters.AppUniqueName, "Edm.String"));
    }
    if (this.parameters.SettingName !== undefined) {
      aliases.push(`SettingName=@p2`);
      params.append("@p2", formatParameterAlias(this.parameters.SettingName, "Edm.String"));
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as RetrieveSettingResponse;
  }
}
