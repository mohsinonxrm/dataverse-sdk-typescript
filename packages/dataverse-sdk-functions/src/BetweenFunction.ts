import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Response from Between function
 */
export interface BetweenResponse {
  value: boolean;
}

/**
 * Parameters of the Between function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface BetweenFunctionParameters {
  PropertyName: string;
  PropertyValues: string[];
}

/**
 * Between function
 *
 * Unbound function
 */
export class BetweenFunction implements Executable<BetweenResponse> {
  constructor(public readonly parameters: BetweenFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/Between`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.PropertyName !== undefined) {
      aliases.push(`PropertyName=@p1`);
      params.append("@p1", formatParameterAlias(this.parameters.PropertyName, "Edm.String"));
    }
    if (this.parameters.PropertyValues !== undefined) {
      aliases.push(`PropertyValues=@p2`);
      params.append("@p2", JSON.stringify(this.parameters.PropertyValues));
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

  async parseResponse(response: Response): Promise<BetweenResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as BetweenResponse;
    return (await response.json()) as BetweenResponse;
  }
}
