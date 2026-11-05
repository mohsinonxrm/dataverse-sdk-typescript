import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Response from InOrBeforeFiscalPeriodAndYear function
 */
export interface InOrBeforeFiscalPeriodAndYearResponse {
  value: boolean;
}

/**
 * InOrBeforeFiscalPeriodAndYear function
 *
 * Unbound function
 */
export class InOrBeforeFiscalPeriodAndYearFunction implements Executable<InOrBeforeFiscalPeriodAndYearResponse> {
  constructor(
    public readonly propertyName: string,
    public readonly propertyValue1: number,
    public readonly propertyValue2: number
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/InOrBeforeFiscalPeriodAndYear`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.propertyName !== undefined) {
      aliases.push(`PropertyName=@p1`);
      params.append("@p1", formatParameterAlias(this.propertyName, "Edm.String"));
    }
    if (this.propertyValue1 !== undefined) {
      aliases.push(`PropertyValue1=@p2`);
      params.append("@p2", formatParameterAlias(this.propertyValue1, "Edm.Int64"));
    }
    if (this.propertyValue2 !== undefined) {
      aliases.push(`PropertyValue2=@p3`);
      params.append("@p3", formatParameterAlias(this.propertyValue2, "Edm.Int64"));
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

  async parseResponse(response: Response): Promise<InOrBeforeFiscalPeriodAndYearResponse> {
    const data = await response.json();
    return data as InOrBeforeFiscalPeriodAndYearResponse;
  }
}
