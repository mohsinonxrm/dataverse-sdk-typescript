import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Response from EqualUserId function
 */
export interface EqualUserIdResponse {
  value: boolean;
}

/**
 * Parameters of the EqualUserId function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface EqualUserIdFunctionParameters {
  PropertyName: string;
}

/**
 * EqualUserId function
 *
 * Unbound function
 */
export class EqualUserIdFunction implements Executable<EqualUserIdResponse> {
  constructor(public readonly parameters: EqualUserIdFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/EqualUserId`;

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

  async parseResponse(response: Response): Promise<EqualUserIdResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as EqualUserIdResponse;
    return (await response.json()) as EqualUserIdResponse;
  }
}
