import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Response from OnOrAfter function
 */
export interface OnOrAfterResponse {
  value: boolean;
}

/**
 * Parameters of the OnOrAfter function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface OnOrAfterFunctionParameters {
  PropertyName: string;
  PropertyValue: string;
}

/**
 * OnOrAfter function
 *
 * Unbound function
 */
export class OnOrAfterFunction implements Executable<OnOrAfterResponse> {
  constructor(public readonly parameters: OnOrAfterFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/OnOrAfter`;

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

  async parseResponse(response: Response): Promise<OnOrAfterResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as OnOrAfterResponse;
    return (await response.json()) as OnOrAfterResponse;
  }
}
