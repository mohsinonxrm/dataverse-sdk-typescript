import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Response from LastMonth function
 */
export interface LastMonthResponse {
  value: boolean;
}

/**
 * Parameters of the LastMonth function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface LastMonthFunctionParameters {
  PropertyName: string;
}

/**
 * LastMonth function
 *
 * Unbound function
 */
export class LastMonthFunction implements Executable<LastMonthResponse> {
  constructor(public readonly parameters: LastMonthFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/LastMonth`;

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

  async parseResponse(response: Response): Promise<LastMonthResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as LastMonthResponse;
  }
}
