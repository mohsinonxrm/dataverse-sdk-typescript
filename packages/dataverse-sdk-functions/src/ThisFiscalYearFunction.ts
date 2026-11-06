import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Response from ThisFiscalYear function
 */
export interface ThisFiscalYearResponse {
  value: boolean;
}

/**
 * Parameters of the ThisFiscalYear function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ThisFiscalYearFunctionParameters {
  PropertyName: string;
}

/**
 * ThisFiscalYear function
 *
 * Unbound function
 */
export class ThisFiscalYearFunction implements Executable<ThisFiscalYearResponse> {
  constructor(public readonly parameters: ThisFiscalYearFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/ThisFiscalYear`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.PropertyName !== undefined) {
      aliases.push(`PropertyName=@p1`);
      params.append("@p1", formatParameterAlias(this.parameters.PropertyName, "Edm.String"));
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

  async parseResponse(response: Response): Promise<ThisFiscalYearResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as ThisFiscalYearResponse;
    return (await response.json()) as ThisFiscalYearResponse;
  }
}
