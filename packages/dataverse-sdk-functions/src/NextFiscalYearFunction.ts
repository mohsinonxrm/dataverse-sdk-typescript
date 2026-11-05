import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatAliasValue } from "./internal/odataLiteral.js";

/**
 * Response from NextFiscalYear function
 */
export interface NextFiscalYearResponse {
  value: boolean;
}

/**
 * NextFiscalYear function
 *
 * Unbound function
 */
export class NextFiscalYearFunction implements Executable<NextFiscalYearResponse> {
  constructor(public readonly propertyName: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/NextFiscalYear`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.propertyName !== undefined) {
      aliases.push(`PropertyName=@p1`);
      params.append("@p1", formatAliasValue(this.propertyName));
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

  async parseResponse(response: Response): Promise<NextFiscalYearResponse> {
    const data = await response.json();
    return data as NextFiscalYearResponse;
  }
}
