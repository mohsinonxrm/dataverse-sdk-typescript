import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Response from UnderOrEqual function
 */
export interface UnderOrEqualResponse {
  value: boolean;
}

/**
 * Parameters of the UnderOrEqual function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface UnderOrEqualFunctionParameters {
  PropertyName: string;
  PropertyValue: string;
}

/**
 * UnderOrEqual function
 *
 * Unbound function
 */
export class UnderOrEqualFunction implements Executable<UnderOrEqualResponse> {
  constructor(public readonly parameters: UnderOrEqualFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/UnderOrEqual`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.PropertyName !== undefined) {
      aliases.push(`PropertyName=@p1`);
      params.append("@p1", formatParameterAlias(this.parameters.PropertyName, "Edm.String"));
    }
    if (this.parameters.PropertyValue !== undefined) {
      aliases.push(`PropertyValue=@p2`);
      params.append("@p2", formatParameterAlias(this.parameters.PropertyValue, "Edm.String"));
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

  async parseResponse(response: Response): Promise<UnderOrEqualResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as UnderOrEqualResponse;
    return (await response.json()) as UnderOrEqualResponse;
  }
}
