import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Response from NextXFiscalYears function
 */
export interface NextXFiscalYearsResponse {
  value: boolean;
}

/**
 * Parameters of the NextXFiscalYears function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface NextXFiscalYearsFunctionParameters {
  PropertyName: string;
  PropertyValue: number;
}

/**
 * NextXFiscalYears function
 *
 * Unbound function
 */
export class NextXFiscalYearsFunction implements Executable<NextXFiscalYearsResponse> {
  constructor(public readonly parameters: NextXFiscalYearsFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/NextXFiscalYears`;

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

  async parseResponse(response: Response): Promise<NextXFiscalYearsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as NextXFiscalYearsResponse;
    return (await response.json()) as NextXFiscalYearsResponse;
  }
}
