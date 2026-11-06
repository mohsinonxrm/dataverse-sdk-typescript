import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Response from Yesterday function
 */
export interface YesterdayResponse {
  value: boolean;
}

/**
 * Parameters of the Yesterday function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface YesterdayFunctionParameters {
  PropertyName: string;
}

/**
 * Yesterday function
 *
 * Unbound function
 */
export class YesterdayFunction implements Executable<YesterdayResponse> {
  constructor(public readonly parameters: YesterdayFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/Yesterday`;

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

  async parseResponse(response: Response): Promise<YesterdayResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as YesterdayResponse;
  }
}
