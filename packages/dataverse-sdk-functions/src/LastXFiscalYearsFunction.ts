import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Response from LastXFiscalYears function
 */
export interface LastXFiscalYearsResponse {
  value: boolean;
}

/**
 * Parameters of the LastXFiscalYears function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface LastXFiscalYearsFunctionParameters {
  PropertyName: string;
  PropertyValue: number;
}

/**
 * LastXFiscalYears function
 *
 * Unbound function
 */
export class LastXFiscalYearsFunction implements Executable<LastXFiscalYearsResponse> {
  constructor(public readonly parameters: LastXFiscalYearsFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/LastXFiscalYears`;

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

  async parseResponse(response: Response): Promise<LastXFiscalYearsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as LastXFiscalYearsResponse;
    return (await response.json()) as LastXFiscalYearsResponse;
  }
}
