import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Response from OlderThanXWeeks function
 */
export interface OlderThanXWeeksResponse {
  value: boolean;
}

/**
 * Parameters of the OlderThanXWeeks function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface OlderThanXWeeksFunctionParameters {
  PropertyName: string;
  PropertyValue: number;
}

/**
 * OlderThanXWeeks function
 *
 * Unbound function
 */
export class OlderThanXWeeksFunction implements Executable<OlderThanXWeeksResponse> {
  constructor(public readonly parameters: OlderThanXWeeksFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/OlderThanXWeeks`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.PropertyName !== undefined) {
      aliases.push(`PropertyName=@p1`);
      params.append("@p1", formatParameterAlias(this.parameters.PropertyName, "Edm.String"));
    }
    if (this.parameters.PropertyValue !== undefined) {
      aliases.push(`PropertyValue=@p2`);
      params.append("@p2", formatParameterAlias(this.parameters.PropertyValue, "Edm.Int64"));
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

  async parseResponse(response: Response): Promise<OlderThanXWeeksResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as OlderThanXWeeksResponse;
    return (await response.json()) as OlderThanXWeeksResponse;
  }
}
