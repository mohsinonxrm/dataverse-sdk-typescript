import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { SettingDetail } from "./types/index.js";

/**
 * Response from RetrieveSetting function
 */
export interface RetrieveSettingResponse {
  SettingDetail: SettingDetail;
}

/**
 * RetrieveSetting function
 *
 * Unbound function
 */
export class RetrieveSettingFunction implements Executable<RetrieveSettingResponse> {
  constructor(
    public readonly appUniqueName: string,
    public readonly settingName: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveSetting`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.appUniqueName !== undefined) {
      aliases.push(`AppUniqueName=@p1`);
      params.append(
        "@p1",
        typeof this.appUniqueName === "string"
          ? `'${this.appUniqueName}'`
          : String(this.appUniqueName)
      );
    }
    if (this.settingName !== undefined) {
      aliases.push(`SettingName=@p2`);
      params.append(
        "@p2",
        typeof this.settingName === "string" ? `'${this.settingName}'` : String(this.settingName)
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

  async parseResponse(response: Response): Promise<RetrieveSettingResponse> {
    const data = await response.json();
    return data as RetrieveSettingResponse;
  }
}
