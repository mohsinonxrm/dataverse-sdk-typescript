import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Response from EqualUserLanguage function
 */
export interface EqualUserLanguageResponse {
  value: boolean;
}

/**
 * Parameters of the EqualUserLanguage function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface EqualUserLanguageFunctionParameters {
  PropertyName: string;
}

/**
 * EqualUserLanguage function
 *
 * Unbound function
 */
export class EqualUserLanguageFunction implements Executable<EqualUserLanguageResponse> {
  constructor(public readonly parameters: EqualUserLanguageFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/EqualUserLanguage`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.PropertyName !== undefined) {
      aliases.push(`PropertyName=@p1`);
      params.append("@p1", formatParameterAlias(this.parameters.PropertyName, "Edm.String"));
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as EqualUserLanguageResponse;
    return (await response.json()) as EqualUserLanguageResponse;
  }
}
