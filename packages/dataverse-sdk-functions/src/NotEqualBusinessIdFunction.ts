import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Response from NotEqualBusinessId function
 */
export interface NotEqualBusinessIdResponse {
  value: boolean;
}

/**
 * Parameters of the NotEqualBusinessId function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface NotEqualBusinessIdFunctionParameters {
  PropertyName: string;
}

/**
 * NotEqualBusinessId function
 *
 * Unbound function
 */
export class NotEqualBusinessIdFunction implements Executable<NotEqualBusinessIdResponse> {
  constructor(public readonly parameters: NotEqualBusinessIdFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/NotEqualBusinessId`;

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

  async parseResponse(response: Response): Promise<NotEqualBusinessIdResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as NotEqualBusinessIdResponse;
  }
}
