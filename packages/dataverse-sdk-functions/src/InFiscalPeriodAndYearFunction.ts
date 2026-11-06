import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Response from InFiscalPeriodAndYear function
 */
export interface InFiscalPeriodAndYearResponse {
  value: boolean;
}

/**
 * Parameters of the InFiscalPeriodAndYear function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface InFiscalPeriodAndYearFunctionParameters {
  PropertyName: string;
  PropertyValue1: number;
  PropertyValue2: number;
}

/**
 * InFiscalPeriodAndYear function
 *
 * Unbound function
 */
export class InFiscalPeriodAndYearFunction implements Executable<InFiscalPeriodAndYearResponse> {
  constructor(public readonly parameters: InFiscalPeriodAndYearFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/InFiscalPeriodAndYear`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.PropertyName !== undefined) {
      aliases.push(`PropertyName=@p1`);
      params.append("@p1", formatParameterAlias(this.parameters.PropertyName, "Edm.String"));
    }
    if (this.parameters.PropertyValue1 !== undefined) {
      aliases.push(`PropertyValue1=@p2`);
      params.append("@p2", formatParameterAlias(this.parameters.PropertyValue1, "Edm.Int64"));
    }
    if (this.parameters.PropertyValue2 !== undefined) {
      aliases.push(`PropertyValue2=@p3`);
      params.append("@p3", formatParameterAlias(this.parameters.PropertyValue2, "Edm.Int64"));
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

  async parseResponse(response: Response): Promise<InFiscalPeriodAndYearResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as InFiscalPeriodAndYearResponse;
  }
}
