import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Response from LastXFiscalPeriods function
 */
export interface LastXFiscalPeriodsResponse {
  value: boolean;
}

/**
 * Parameters of the LastXFiscalPeriods function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface LastXFiscalPeriodsFunctionParameters {
  PropertyName: string;
  PropertyValue: number;
}

/**
 * LastXFiscalPeriods function
 *
 * Unbound function
 */
export class LastXFiscalPeriodsFunction implements Executable<LastXFiscalPeriodsResponse> {
  constructor(public readonly parameters: LastXFiscalPeriodsFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/LastXFiscalPeriods`;

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

  async parseResponse(response: Response): Promise<LastXFiscalPeriodsResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as LastXFiscalPeriodsResponse;
  }
}
