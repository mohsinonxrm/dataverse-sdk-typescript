import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Response from ContainValues function
 */
export interface ContainValuesResponse {
  value: boolean;
}

/**
 * Parameters of the ContainValues function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ContainValuesFunctionParameters {
  PropertyName: string;
  PropertyValues: string[];
}

/**
 * ContainValues function
 *
 * Unbound function
 */
export class ContainValuesFunction implements Executable<ContainValuesResponse> {
  constructor(public readonly parameters: ContainValuesFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/ContainValues`;

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

  async parseResponse(response: Response): Promise<ContainValuesResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as ContainValuesResponse;
    return (await response.json()) as ContainValuesResponse;
  }
}
