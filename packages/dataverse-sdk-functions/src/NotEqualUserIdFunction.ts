import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Response from NotEqualUserId function
 */
export interface NotEqualUserIdResponse {
  value: boolean;
}

/**
 * Parameters of the NotEqualUserId function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface NotEqualUserIdFunctionParameters {
  PropertyName: string;
}

/**
 * NotEqualUserId function
 *
 * Unbound function
 */
export class NotEqualUserIdFunction implements Executable<NotEqualUserIdResponse> {
  constructor(public readonly parameters: NotEqualUserIdFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/NotEqualUserId`;

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

  async parseResponse(response: Response): Promise<NotEqualUserIdResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as NotEqualUserIdResponse;
    return (await response.json()) as NotEqualUserIdResponse;
  }
}
