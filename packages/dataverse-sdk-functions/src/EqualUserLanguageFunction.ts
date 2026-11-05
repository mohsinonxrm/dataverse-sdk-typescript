import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatAliasValue } from "./internal/odataLiteral.js";

/**
 * Response from EqualUserLanguage function
 */
export interface EqualUserLanguageResponse {
  value: boolean;
}

/**
 * EqualUserLanguage function
 *
 * Unbound function
 */
export class EqualUserLanguageFunction implements Executable<EqualUserLanguageResponse> {
  constructor(public readonly propertyName: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/EqualUserLanguage`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.propertyName !== undefined) {
      aliases.push(`PropertyName=@p1`);
      params.append("@p1", formatAliasValue(this.propertyName));
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

  async parseResponse(response: Response): Promise<EqualUserLanguageResponse> {
    const data = await response.json();
    return data as EqualUserLanguageResponse;
  }
}
