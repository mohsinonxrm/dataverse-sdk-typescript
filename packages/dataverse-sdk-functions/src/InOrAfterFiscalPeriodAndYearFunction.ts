import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Response from InOrAfterFiscalPeriodAndYear function
 */
export interface InOrAfterFiscalPeriodAndYearResponse {
  value: boolean;
}

/**
 * Parameters of the InOrAfterFiscalPeriodAndYear function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface InOrAfterFiscalPeriodAndYearFunctionParameters {
  PropertyName: string;
  PropertyValue1: number;
  PropertyValue2: number;
}

/**
 * InOrAfterFiscalPeriodAndYear function
 *
 * Unbound function
 */
export class InOrAfterFiscalPeriodAndYearFunction implements Executable<InOrAfterFiscalPeriodAndYearResponse> {
  constructor(public readonly parameters: InOrAfterFiscalPeriodAndYearFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/InOrAfterFiscalPeriodAndYear`;

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

  async parseResponse(response: Response): Promise<InOrAfterFiscalPeriodAndYearResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as InOrAfterFiscalPeriodAndYearResponse;
    return (await response.json()) as InOrAfterFiscalPeriodAndYearResponse;
  }
}
