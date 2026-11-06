import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Response from NextXFiscalPeriods function
 */
export interface NextXFiscalPeriodsResponse {
  value: boolean;
}

/**
 * Parameters of the NextXFiscalPeriods function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface NextXFiscalPeriodsFunctionParameters {
  PropertyName: string;
  PropertyValue: number;
}

/**
 * NextXFiscalPeriods function
 *
 * Unbound function
 */
export class NextXFiscalPeriodsFunction implements Executable<NextXFiscalPeriodsResponse> {
  constructor(public readonly parameters: NextXFiscalPeriodsFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/NextXFiscalPeriods`;

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

  async parseResponse(response: Response): Promise<NextXFiscalPeriodsResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as NextXFiscalPeriodsResponse;
  }
}
